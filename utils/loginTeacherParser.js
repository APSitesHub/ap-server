const { allTeachers } = require("../services/teachersServices");
const { getToken } = require("../services/tokensServices");
const axios = require("axios");

const PIPLINE_ID = 7009591;
const STATUS_IDS = [
  64003064, 62126764, 64003068, 64003072, 64003076, 64003080, 58482219,
  58482335, 58482223, 58482227,
];

async function loginTeacherParser() {
  const teachers = await allTeachers();
  const teachersFromCRM = await fetchLeads(PIPLINE_ID, STATUS_IDS);

  const parsingTeachers = teachers
    .filter((teacher) => teacher.login.startsWith("teacher"))
    .map((teacher) => {
      return {
        id: teacher._id.toString(),
        name: teacher.name,
        teacherId: teacher.login.substring("teacher".length),
      };
    });

  const result = await limitConcurrentRequests(
    teachersFromCRM
      .filter((t) => t._embedded.contacts[0])
      .map((teacher, index) => async () => {
        console.log(index);
        
        const contact = teacher._embedded.contacts[0];
        const contactDetails = await fetchContact(contact.id);

        if (contactDetails.custom_fields_values) {
          const test = contactDetails.custom_fields_values.find((field) =>
            field.field_name.includes("altegio")
          );

          if (test) {
            console.log(test);
          }
        }

        // if (contactDetails.custom_fields_values) {
        //   console.log(contactDetails);
        // }

        return {
          id: teacher.id,
          name: contactDetails.name,
        };
      }),
    5
  );

  console.log('end');
  
}

async function fetchLeads(piplineId, statusIds) {
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    let allLeads = [];
    let page = 1;
    let hasMoreLeads = true;

    while (hasMoreLeads) {
      const response = await axios.get(
        "https://apeducation.kommo.com/api/v4/leads",
        {
          params: {
            "filter[statuses][0][pipeline_id]": piplineId,
            "filter[statuses][0][status_id]": statusIds,
            page,
            limit: 250,
            with: "contacts",
          },
        }
      );

      const leads = response.data._embedded.leads;

      allLeads = allLeads.concat(leads);

      if (leads.length < 250) {
        hasMoreLeads = false;
      } else {
        page++;
      }
    }

    return allLeads;
  } catch (error) {
    console.error("Error fetching CRM ids:", error);
  }
}

async function fetchContact(contactId) {
  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    const response = await axios.get(
      `https://apeducation.kommo.com/api/v4/contacts/${contactId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
}

async function limitConcurrentRequests(tasks, limit) {
  const results = [];
  const executing = [];
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);

    if (limit <= tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

module.exports = { loginTeacherParser };
