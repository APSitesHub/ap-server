const Joi = require("joi");

const leadSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  time: Joi.string().optional().empty(""),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  position: Joi.string().optional().empty(""),
  crmId: Joi.number(),
  utm_content: Joi.string().empty(""),
  utm_medium: Joi.string().empty(""),
  utm_campaign: Joi.string().empty(""),
  utm_source: Joi.string().empty(""),
  utm_term: Joi.string().empty(""),
  utm_referrer: Joi.string().empty(""),
  referrer: Joi.string().empty(""),
  referral: Joi.string().optional().empty(""),
  gclientid: Joi.string().empty(""),
  gclid: Joi.string().empty(""),
  fbclid: Joi.string().empty(""),
});
const leadConfernceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  city: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(1).max(100).required(),
  source: Joi.string().min(1).max(100).required(),
  role: Joi.string().min(1).max(100).required(),
  job: Joi.string().min(1).max(100).required(),
  tag: Joi.string().empty(""),
  lang: Joi.string().empty(""),
  crmId: Joi.number(),
  utm_content: Joi.string().empty(""),
  utm_medium: Joi.string().empty(""),
  utm_campaign: Joi.string().empty(""),
  utm_source: Joi.string().empty(""),
  utm_term: Joi.string().empty(""),
  utm_referrer: Joi.string().empty(""),
  referrer: Joi.string().empty(""),
  gclientid: Joi.string().empty(""),
  gclid: Joi.string().empty(""),
  fbclid: Joi.string().empty(""),
});

const contractLeadSchema = Joi.object({
  leadId: Joi.number(),
  isChild: Joi.boolean(),
  fields_fullName: Joi.string()
    .trim()
    .min(1)
    .required()
    .pattern(/^\S+\s+\S+\s+\S+$/)
    .messages({
      "string.base": "Ім'я має бути рядком.",
      "string.empty": "Ім'я є обов'язковим.",
      "string.pattern.base":
        "Введіть повне ПІБ (прізвище, ім'я та по батькові).",
    }),

  fields_phone: Joi.string()
    .pattern(/^\+?[0-9]{10,14}$/)
    .required()
    .messages({
      "string.empty": "Телефон є обов'язковим.",
      "string.pattern.base": "Невірний формат номера телефону.",
    }),

  fields_IDcard: Joi.string()
    .required()
    .pattern(/^\d{9}$|^[A-ZА-ЯЄІЇҐ]{2}\d{6}$/i)
    .messages({
      "string.empty": "Номер паспорта є обов'язковим.",
      "string.pattern.base":
        "Неправильний формат паспорта. Використовуйте 9 цифр або 2 літери та 6 цифр (наприклад, AB123456).",
    }),

  fields_IPN: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "РНОКПП(ІПН) є обов'язковим.",
      "string.pattern.base": "РНОКПП(ІПН) повинен містити рівно 10 цифр.",
    }),

  fields_fullNameTrustedPerson: Joi.string()
    .trim()
    .min(1)
    .pattern(/^\S+\s+\S+\s+\S+$/)
    .required()
    .messages({
      "string.empty": "ПІБ довіреної особи є обов'язковим.",
      "string.pattern.base":
        "Введіть повне ПІБ (прізвище, ім'я та по батькові).",
    }),

  fields_phoneTrustedPerson: Joi.string()
    .pattern(/^\+?[0-9]{10,14}$/)
    .required()
    .messages({
      "string.empty": "Телефон довіреної особи є обов'язковим.",
      "string.pattern.base": "Невірний формат номера телефону.",
    }),

  fields_deliveryService: Joi.string().allow("").optional(),
  fields_deliveryAddress: Joi.string().allow("").optional(),

  fields_childName: Joi.string()
    .trim()
    .pattern(/^\S+\s+\S+\s+\S+$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Введіть повне ПІБ дитини (прізвище, ім'я та по батькові).",
    }),
  fields_childDOB: Joi.string()
    .messages({
      "string.pattern.base":
        "Date must be in the format YYYY-MM-DDTHH:MM:SS+TZ.",
    })
    .optional(),
  fields_address: Joi.string().required(),
  fields_currentAddress: Joi.string().required(),
});

const leadCertificateSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).max(20).required(),
  work: Joi.string().required(),
  job: Joi.string().required(),
  email: Joi.string().email().required(),
});

const leadFeedbackSchema = Joi.object({
  leadId: Joi.string().optional(),
  answers: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        question: Joi.string().required(),
        shortanswer: Joi.string().optional(),
        longanswer: Joi.string().optional(),
        rating: Joi.number().optional(),
      })
    )
    .required(),
});

const leadEventSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  phone: Joi.string().min(10).max(20).required(),
  childName: Joi.string().optional().empty(""),
  age: Joi.string().required(),
  eventType: Joi.string().required(),
  utm_content: Joi.string().empty(""),
  utm_medium: Joi.string().empty(""),
  utm_campaign: Joi.string().empty(""),
  utm_source: Joi.string().empty(""),
  utm_term: Joi.string().empty(""),
  utm_referrer: Joi.string().empty(""),
  referrer: Joi.string().empty(""),
  gclientid: Joi.string().empty(""),
  gclid: Joi.string().empty(""),
  fbclid: Joi.string().empty(""),
});

const validateLead = ({ body }, res, next) => {
  const { error } = leadSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

const validateLeadConference = ({ body }, res, next) => {
  const { error } = leadConfernceSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

const validateLeadContract = ({ body }, res, next) => {
  const { error } = contractLeadSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

const validateLeadCertificate = ({ body }, res, next) => {
  const { error } = leadCertificateSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

const validateLeadFeedback = ({ body }, res, next) => {
  const { error } = leadFeedbackSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);

  console.log('VALIDATE ACSSESS');
  
  next();
};

const validateLeadEvent = ({ body }, res, next) => {
  const { error } = leadEventSchema.validate(body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
};

module.exports = {
  validateLead,
  validateLeadConference,
  validateLeadContract,
  validateLeadCertificate,
  validateLeadFeedback,
  validateLeadEvent,
};
