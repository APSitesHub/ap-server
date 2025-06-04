const axios = require("axios");
const { getToken } = require("../tokensServices");
const getLeadWithEngPage = require("../../utils/crm/getLeadWithEngPage");

async function createQuizLeadEng(data) {
  const { name, phone, email, callTime, answers, ...utmFields } = data;

  // Map answers to include question text and selected answer content
  const answersList = answers.map((item) => {
    const question = questions.find((q) => q.id === item.id);
    return {
      question: question ? question.question : `Question ${item.id}`,
      selectedAnswer: question ? question.options[item.answer] : "Unknown answer", // Store the content of the selected answer
    };
  });

  // Calculate total score based on the scoring system
  const score = answers.reduce((total, item) => {
    const question = questions.find((q) => q.id === item.id);
    if (!question) return total;

    const questionIndex = questions.indexOf(question);
    const weight = questionIndex < 3 ? 1 : questionIndex < 6 ? 2 : 3; // Scoring system
    return total + (item.answer === question.correct ? weight : 0);
  }, 0);

   let level = "A1";
    if (score >= 0 && score <= 3) {
      level = "A1";
    } else if (score >= 4 && score <= 6) {
      level = "A2";
    } else if (score >= 7 && score <= 9) {
      level = "B1";
    } else if (score >= 10) {
      level = "B2";
    }

  const postRequest = [
    {
      name: `Quiz Lead ${name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1827483, // Field for storing quiz answers
          field_name: "Відповіді з квіза",
          values: [
            {
              value: JSON.stringify(answersList),
            },
          ],
        },
        {
          field_id: 1827485, // Field for storing quiz score
          field_name: "Оцінка за квіз",
          values: [
            {
              value: score,
            },
          ],
        },
        {
          field_id: 1822925, // Field for call time
          field_name: "Час дзвінка",
          values: [
            {
              value: callTime || "",
            },
          ],
        },
        {
          field_id: 1827945, // Field for English level
          field_name: "Визначений рівень",
          values: [
            {
              value: level,
            },
          ],
        },
        ...Object.entries(utmFields).map(([key, value]) => ({
          field_id: getFieldIdByKey(key), // Map UTM/referrer fields to their IDs
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
              { name: "Лід з сайту" },
              { name: "квіз лід англійська" },
              { name: utmFields.utm_source },
              { name: utmFields.utm_campaign },
              { name: utmFields.utm_term },
              { name: utmFields.utm_content },
              { name: utmFields.fbclid },
              { name: utmFields.gclid },
              { name: utmFields.gclientid },
              { name: utmFields.utm_medium },
              { name: utmFields.utm_referrer },
              { name: utmFields.referrer },
            ],
        contacts: [
          {
            name,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [
                  {
                    value: phone,
                    enum_code: "WORK",
                  },
                ],
              },
              {
                field_id: 556512,
                field_name: "Email",
                values: [
                  {
                    value: email || "",
                    enum_code: "WORK",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

  try {
    const currentToken = await getToken();
    axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;

    // Create the lead
    const crmLead = await axios.post("/api/v4/leads/complex", postRequest);
    const leadId = crmLead.data[0].id;

    // Determine the recommended level
    const level = score <= 10 ? "початковий" : "середній";

    // Create a note for the lead
    const noteRequest = [
      {
        entity_id: leadId,
        entity_type: "leads",
        note_type: "common", // Common note type
        params: {
          text: `Приблизний рекомендований англійської рівень: ${level}`,
        },
        request_id: `note_${leadId}`,
      },
    ];

    // Fix the URL by ensuring it starts with a `/`
    await axios.post("/api/v4/leads/notes", noteRequest);
    const engPage = getLeadWithEngPage(leadId);
    return engPage;
  } catch (error) {
    console.error("Error creating quiz lead or note:", error);
    throw error;
  }
}

// Helper function to map UTM/referrer keys to field IDs
function getFieldIdByKey(key) {
  const fieldMap = {
    utm_source: 556524,
    utm_medium: 556520,
    utm_campaign: 556522,
    utm_term: 556526,
    utm_content: 556518,
    utm_referrer: 556528,
    referrer: 556530,
    gclientid: 556532,
    gclid: 556534,
    fbclid: 556536,
  };
  return fieldMap[key] || null;
}

// Questions array
const questions = [
  {
    id: 1,
    question: 'Як правильно відповісти на запитання: "Як тебе звати?"',
    options: ["I am call Anna.", "My name is Anna.", "I calling Anna."],
    correct: 1,
  },
  {
    id: 2,
    question: "Оберіть правильний варіант: Good morning! How you?",
    options: ["is", "are", "am"],
    correct: 1,
  },
  {
    id: 3,
    question: "Яке речення правильне:",
    options: ["She live in London.", "She lives in London.", "She living in London."],
    correct: 1,
  },
  {
    id: 4,
    question: "Оберіть правильне речення: I have been living here five years.",
    options: ["since", "for", "during"],
    correct: 1,
  },
  {
    id: 5,
    question: 'Виберіть правильний переклад: "Чи можу я взяти це?"',
    options: ["Can I take this?", "May I taken this?", "Could I taking this?"],
    correct: 0,
  },
  {
    id: 6,
    question: "Яке речення правильне: When you finish your homework?",
    options: ["do", "does", "did"],
    correct: 2,
  },
  {
    id: 7,
    question: "Оберіть правильне продовження речення: If I had more free time, I travel the world.",
    options: ["would", "will", "can"],
    correct: 0,
  },
  {
    id: 8,
    question: "Виберіть правильний варіант: Despite ___ late, he managed to catch the train.",
    options: ["to be", "being", "been"],
    correct: 1,
  },
  {
    id: 9,
    question: "Яке речення граматично правильне:",
    options: [
      "He suggested to go to the museum.",
      "He suggested going to the museum.",
      "He suggested go to the museum.",
    ],
    correct: 1,
  },
];

module.exports = {
  createQuizLeadEng,
};
