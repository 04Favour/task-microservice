import Joi from "joi"

export const ValidationScript = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_USER: Joi.string().required()
})