import Joi from "joi";

export const schemas = {
  basicMessage: Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    message: Joi.string().min(1).max(100).required()
  })
}
