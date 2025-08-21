import Joi from "joi";

const messageSchema = Joi.object({
  datetime: Joi.date().required().messages({
    "any.required": "No datetime",
    "date.base": "Invalid datetime format",
  }),
  appointmentId: Joi.string().required().messages({
    "any.required": "No appointmentId",
    "string.base": "appointmentId must be a string",
  }),
  text: Joi.string().required().messages({
    "any.required": "No message text",
    "string.base": "Message text must be a string",
  }),
  isSent: Joi.boolean().required().messages({
    "any.required": "isSent is required",
    "boolean.base": "isSent must be a boolean",
  }),
});

const individualUserSchema = Joi.object({
  crmId: Joi.string().required().messages({
    "any.required": "No crmId",
    "string.base": "crmId must be a string",
  }),
  altegioId: Joi.string().required().messages({
    "any.required": "No altegioId",
    "string.base": "altegioId must be a string",
  }),
  chatId: Joi.string().required().messages({
    "any.required": "No chatId",
    "string.base": "chatId must be a string",
  }),
  name: Joi.string().required().messages({
    "any.required": "No name",
    "string.base": "name must be a string",
  }),
  messagesHistory: Joi.array().items(messageSchema),
});

export default individualUserSchema;
