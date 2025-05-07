const axios = require("axios");
const { getToken } = require("../tokensServices");

async function createQuizLeadNMT(data) {
  const { userInfo, parentInfo, answers, score, utmTags } = data;
  const { name, school } = userInfo;
  const { parentName, parentPhone } = parentInfo;

  const answersList = answers.map((item) => {
    const question = questions.find((q) => q.id === item.id);
    return {
      question: question ? question.question : `Question ${item.id}`,
      selectedAnswer: question ? question.options[item.answer] : "Unknown answer",
    };
  });

  const postRequest = [
    {
      name: `Quiz Lead ${name}`,
      status_id: 59164875,
      pipeline_id: 6453287,
      custom_fields_values: [
        {
          field_id: 1827483,
          field_name: "Відповіді з квіза",
          values: [
            {
              value: JSON.stringify(answersList),
            },
          ],
        },
        {
          field_id: 1827485,
          field_name: "Оцінка за квіз",
          values: [
            {
              value: score,
            },
          ],
        },
        {
          field_id: 1827493,
          field_name: "Школа",
          values: [
            {
              value: school || "",
            },
          ],
        },
      ...Object.entries(utmTags).map(([key, value]) => ({
          field_id: getFieldIdByKey(key), // Map UTM/referrer fields to their IDs
          values: [{ value: value || "" }],
        })),
      ],
      _embedded: {
        tags: [
          { name: "Лід з сайту" },
          { name: "квіз лід НМТ" },
          { name: utmTags.utm_source },
          { name: utmTags.utm_campaign },
          { name: utmTags.utm_term },
          { name: utmTags.utm_content },
          { name: utmTags.fbclid },
          { name: utmTags.gclid },
          { name: utmTags.gclientid },
          { name: utmTags.utm_medium },
          { name: utmTags.utm_referrer },
          { name: utmTags.referrer },
        ],
        contacts: [
          {
            name: parentName,
            custom_fields_values: [
              {
                field_id: 556510,
                field_name: "Phone",
                values: [
                  {
                    value: parentPhone,
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
    const noteRequest = [
      {
        entity_id: leadId,
        entity_type: "leads",
        note_type: "common", // Common note type
        params: {
          text: `Знижка з квізу: ${score} %`,
        },
        request_id: `note_${leadId}`,
      },
    ];

    await axios.post("/api/v4/leads/notes", noteRequest);

    return crmLead.data[0];
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
    question: 'Укажіть речення з дієприслівниковим зворотом, який потребує відокремлення комами:',
    options: [
      'Коли почалася злива ми заховалися під навіс.',
      'Прочитавши повідомлення він одразу відповів.',
      'Він відповів одразу після того як прочитав повідомлення.',
      'Через зливу ми заховалися під навіс.',
    ],
    correct: 1,
  },
  {
    id: 2,
    question: 'Хто з персонажів вважає: «Коли не я, то хто ж?..»',
    options: [
      'Чіпка з «Хіба ревуть воли, як ясла повні?»',
      'Мартин Боруля',
      'Мойсей',
      'Григорій з «Тигроловів»',
    ],
    correct: 2,
  },
  {
    id: 3,
    question: 'Яке з наведених речень є складнопідрядним означальним?',
    options: [
      'Я підійшов до хлопця і запитав його про дорогу.',
      'Я підійшов до хлопця, який стояв біля зупинки.',
      'Я підійшов до хлопця — він стояв біля зупинки.',
      'Я підійшов до хлопця, він посміхнувся.',
    ],
    correct: 1,
  },
  {
    id: 4,
    question: 'Який акт закріпив приєднання західноукраїнських земель до Польщі у 1923 р.?',
    options: [
      'Сен-Жерменський договір',
      'Рішення Ради послів Антанти',
      'Версальський договір',
      'Брусиловський протокол',
    ],
    correct: 1,
  },
  {
    id: 5,
    question: 'Хто з історичних діячів очолив Коліївщину?',
    options: ['Семен Палій', 'Максим Залізняк', 'Іван Гонта', 'Данило Апостол'],
    correct: 1,
  },
  {
    id: 6,
    question: 'Укажіть основну мету створення РУХу в 1989 році:',
    options: [
      'Вихід України з СРСР',
      'Демократизація суспільства та захист національної культури',
      'Встановлення монархії',
      'Приєднання до НАТО',
    ],
    correct: 1,
  },
  {
    id: 7,
    question: 'Яка формула використовується для обчислення площі прямокутника?',
    options: ['P=4a', 'S=a⋅b', 'V=a⋅b⋅c', 'C=2πr', 'P=2(a+b)'],
    correct: 1,
  },
  {
    id: 8,
    question: 'Укажіть вираз, тотожно рівний виразу (2x+5)(3−x).',
    options: ['15+x−2x^2', '15+x+2x^2', '15+6x−2x^2', '15+11x−2x^2', '15+11x+2x^2'],
    correct: 2,
  },
  {
    id: 9,
    question: 'Choose the correct sentence in Passive Voice:',
    options: [
      'They built the house last year.',
      'The house was built last year.',
      'The house built last year.',
      'The house is build last year.',
    ],
    correct: 1,
  },
  {
    id: 10,
    question:
      'Choose the correct reported speech transformation: He said: “I will go to London tomorrow.”',
    options: [
      'He said he would go to London today.',
      'He said he would go to London the next day.',
      'He said he will go to London tomorrow.',
      'He said I would go to London the next day.',
    ],
    correct: 1,
  },
];

module.exports = {
  createQuizLeadNMT,
};
