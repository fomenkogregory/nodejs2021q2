import Joi from 'joi';
import { User } from './user';

const userJoiObject = {
    login: Joi.string(),
    age: Joi.number().min(4).max(130),
    password: Joi.string()
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/)
};

const makeAllKeysRequired = (object: Record<string, Joi.AnySchema>) =>
    Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, value.required()])
    );

export const userRequiredSchema = Joi.object<User>(
    makeAllKeysRequired(userJoiObject)
);
export const userPartialSchema = Joi.object<User>(userJoiObject);
