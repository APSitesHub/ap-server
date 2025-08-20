import Joi from "joi";

export const feedbackSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().allow("").optional(),
  userId: Joi.string().optional(),
  createdAt: Joi.date().optional(),
});

export const webinarFeedbacksSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Id name must be a string",
    "any.required": "Id is required",
  }),
  teachername: Joi.string().optional(),
  lesson: Joi.string().required().messages({
    "string.base": "Lesson must be a string",
    "any.required": "Lesson is required",
  }),
  date: Joi.date().optional(),
  feedbacks: Joi.array().items(feedbackSchema).optional(),
});
