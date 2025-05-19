const { default: axios } = require("axios");
const { default: mongoose } = require("mongoose");
const { allTeachers } = require("../services/teachersServices");
const fs = require("fs/promises");
const path = require("path");

const getFromAltegio = async () => {
  const response = await axios.get(
    "https://api.alteg.io/api/v1/company_users/761978",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.api.v2+json",
        Authorization:
          "Bearer mfetcrjfeh2fmzkjwee8, User 443d861e81f10311e98593547a8549bd",
      },
    }
  );

  const result = response.data.data.map((user) => {
    return {
      altegioId: user.id,
      name: user.firstname,
    };
  });

  console.log(result.length);

  return result;
};

const getTeachersByStatus = async (status) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxYTdiNjQ4YzMyZDRhODRkZjA2MjUzNWI0MTJhMzc2ZTUxMDIwMjk3NDZkZDc0YzUyZjAyOGI1MDk3ZTEzNTNlMWVlZGRmZjM1Mzk4ZTgwIn0.eyJhdWQiOiI0YzliZDIyOC1lYzhhLTQxMjQtOWIxOC00YzZlMjhmOGVhZGYiLCJqdGkiOiIyMWE3YjY0OGMzMmQ0YTg0ZGYwNjI1MzViNDEyYTM3NmU1MTAyMDI5NzQ2ZGQ3NGM1MmYwMjhiNTA5N2UxMzUzZTFlZWRkZmYzNTM5OGU4MCIsImlhdCI6MTczODE0MjcxOSwibmJmIjoxNzM4MTQyNzE5LCJleHAiOjE3Njk2NDQ4MDAsInN1YiI6IjExMjI1NzYwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMwOTM2MDk1LCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDVhYjM5YWItYjI5ZC00NjBhLWE4M2QtYmExZmI5MzEwNDVlIiwiYXBpX2RvbWFpbiI6ImFwaS1nLmtvbW1vLmNvbSJ9.HA4ChZO3MGn9JrtZCS6znuuMy0z3WPiC7RCg4xYBw5kMpwBEyuVWIHgXMlOHn25LnVl2_lKRznlW0TeMgY35fqQd9k2tUQSgwO5XgoxeE2FRetUbMsHH-VTeSeOg1zBZQEJD87wjCGWKfFzoU6CXprt0Vyi2RaxSDZboLNxBBPLEiKd4LS8614urbX84NiRQaNVhit2HSF9e0rPg3eW4XVZXhd2fZVJFueK6YvY8-sZzVaa4xkktKgYEcp9K4psulTT08e9kZ6PXK1-OfJVHE9R0g-bRgDZ38YtVWmv6bhU8p6VCJOpwQfgySpNjqoS33bZ5Ic3KXvQFnSb22y86ig";

  const response = await axios.get(
    `https://apeducation.kommo.com/api/v4/leads?&filter[statuses][0][pipeline_id]=7009591&filter[statuses][0][status_id]=${status}`,
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

const getFromCRM = async () => {
  const teacherStatuses = [
    58482219, 58482335, 58482223, 58482227, 64003064, 64003068, 64003076,
    62126764, 64003072, 64003080,
  ];

  const chunkSize = 5; // Кількість запитів одночасно
  const delayMs = 500; // Затримка між групами (1 секунда)

  const statusChunks = chunkArray(teacherStatuses, chunkSize);
  const results = [];

  for (const chunk of statusChunks) {
    const chunkResults = await Promise.all(
      chunk.map((status) => getTeachersByStatus(status))
    );
    results.push(...chunkResults);
    await sleep(delayMs); // Затримка перед наступною групою
  }

  const allTeachers = results.flatMap((teacher) =>
    teacher.map((lead) => ({
      crmId: lead.id,
      name: lead.name,
    }))
  );

  console.log(allTeachers);

  return allTeachers;
};

const getFromDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dev_olexandr:gFTKCGtxYnWkbxQo@aggregator.oez88xk.mongodb.net/aggregator-db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const teachers = await allTeachers();

  return teachers.map((teacher) => {
    return {
      dbId: teacher.id,
      name: teacher.name,
    };
  });
};

const compareTeachers = async () => {
  const altegioUsers = await getFromAltegio(); // [{ altegioId, name }]
  const crmUsers = await getFromCRM(); // [{ crmId, name }]
  const dbUsers = await getFromDB(); // [{ dbId, name }]

  const normalizeName = (name) => {
    if (!name) {
      name = "1";
    }

    return name
      .toLowerCase()
      .replace(/[^a-zа-яёіїєґ0-9\s]/gi, "") // прибрати символи
      .split(/\s+/) // розділити на слова
      .filter(Boolean); // прибрати порожні
  };

  const matchByName = (targetWords, sourceName) => {
    const sourceWords = normalizeName(sourceName);
    const matches = targetWords.filter((word) => sourceWords.includes(word));
    return matches.length >= 2;
  };

  const result = altegioUsers.map((altegioUser) => {
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

compareTeachers();
// getFromAltegio();
