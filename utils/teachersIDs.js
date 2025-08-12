const { default: axios } = require("axios");
const {
  allTeachers,
  updateTeacher,
  newTeacher,
} = require("../services/teachersServices");
const fs = require("fs/promises");
const path = require("path");
const connectDB = require("../db/connection");
const { altegioGet } = require("../services/altegio/altegioAuth");

const getAllStuffFromAltegio = async () => {
  const response = await altegioGet(
    `https://api.alteg.io/api/v1/book_staff/${process.env.ALTEGIO_COMPANY_ID}`
  );

  const result = response.data.data.map((user) => {
    return {
      altegioId: user.id,
      name: user.name,
      specialization: user.specialization,
    };
  });

  return result;
};

const getTeachersByStatus = async (status) => {
  const STUFF_PTPLINE_ID = 7009591;

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${process.env.LONG_LIVED_TOKEN}`;

  const response = await axios.get(
    `https://apeducation.kommo.com/api/v4/leads?&filter[statuses][0][pipeline_id]=${STUFF_PTPLINE_ID}&filter[statuses][0][status_id]=${status}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data._embedded.leads;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const getTeachersFromCRM = async () => {
  const teacherStatuses = [
    58482219, 58482335, 58482223, 58482227, 64003064, 64003068, 64003076,
    62126764, 64003072, 64003080,
  ];

  const chunkSize = 5;
  const delayMs = 500;

  const statusChunks = chunkArray(teacherStatuses, chunkSize);
  const results = [];

  for (const chunk of statusChunks) {
    const chunkResults = await Promise.all(
      chunk.map((status) => getTeachersByStatus(status))
    );
    results.push(...chunkResults);
    await sleep(delayMs);
  }

  const allTeachers = results.flatMap((teacher) =>
    teacher.map((lead) => ({
      crmId: lead.id,
      name: lead.name,
    }))
  );

  return allTeachers;
};

const getTeachersFromDB = async () => {
  await connectDB();
  const teachers = await allTeachers();

  return teachers.map((teacher) => {
    return {
      dbId: teacher.id,
      name: teacher.name,
    };
  });
};

const compareTeachersAndWriteToJSON = async () => {
  const altegioUsers = await getAllStuffFromAltegio(); // [{ altegioId, name }]
  const crmUsers = await getTeachersFromCRM(); // [{ crmId, name }]
  const dbUsers = await getTeachersFromDB(); // [{ dbId, name }]

  const normalizeName = (name) => {
    if (!name) {
      name = "1";
    }

    return name.toLowerCase().split(/\s+/).filter(Boolean);
  };

  const matchByName = (targetWords, sourceName) => {
    const sourceWords = normalizeName(sourceName);
    const matches = targetWords.filter((word) => sourceWords.includes(word));
    return matches.length >= 2;
  };

  const result = altegioUsers
    .filter((altegioUser) => !altegioUser.name.includes("ЗВІЛЬНЕНО"))
    .map((altegioUser) => {
      const dbWords = normalizeName(altegioUser.name);

      const matchedDB = dbUsers.find((dbUser) =>
        matchByName(dbWords, dbUser.name)
      );

      const matchedCRM = crmUsers.find((crmUser) =>
        matchByName(dbWords, crmUser.name)
      );

      const matched = {
        name: altegioUser.name,
        altegioId: altegioUser.altegioId,
        ...(matchedDB && { dbId: matchedDB.dbId }),
        ...(matchedCRM && { crmId: matchedCRM.crmId }),
      };

      return matched;
    });

  const outputPath = path.resolve(process.cwd(), "comparedUsers.json");
  await fs.writeFile(outputPath, JSON.stringify(result, null, 2), "utf-8");

  console.log("ЗАПИСАНО");

  return result;
};

const checkDBTeachersCount = async () => {
  const fileString = await fs.readFile(
    path.resolve(process.cwd(), "dbIDs.json"),
    "utf-8"
  );

  const teachersIDs = JSON.parse(fileString);
  const teachers = await getTeachersFromDB();
  let count = 0;

  teachersIDs.forEach((id) => {
    const t = teachers.find((teacher) => teacher.dbId === id);
    if (t) {
      count++;
    }
  });

  console.log(`IDs matched: ${count}`);
};

const writeUsersToDB = async () => {
  await connectDB();
  const fileString = await fs.readFile(
    path.resolve(process.cwd(), "comparedUsers.json"),
    "utf-8"
  );
  const teachers = JSON.parse(fileString);
  const altegioTeachers = await getAllStuffFromAltegio();

  teachers.forEach(async (teacher) => {
    const altegioTeacher = altegioTeachers.find(
      (t) => t.altegioId === teacher.altegioId
    );

    let lang;

    if (altegioTeacher.specialization.includes("німе")) {
      lang = "de";
    } else if (altegioTeacher.specialization.includes("поль")) {
      lang = "pl";
    } else {
      lang = "en";
    }

    if (teacher.dbId) {
      await updateTeacher(teacher.dbId, {
        altegioId: teacher.altegioId,
        crmId: teacher.crmId,
      });
    } else {
      await newTeacher({
        name: teacher.name.split(" ").slice(0, 2).join(" "),
        login: `teacher${teacher.altegioId}`,
        password: `${teacher.crmId}`,
        lang: lang,
        altegioId: teacher.altegioId,
        crmId: teacher.crmId,
      });
    }
  });

  console.log("updated");
};

// compareTeachers();
// getAllStuffFromAltegio();
// getFromDB();
// writeDBIDs();
// checkDBTeachersCount();
// writeUsersToDB();
