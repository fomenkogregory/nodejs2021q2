import Joi from 'joi';
import { User } from './user';
import { JoiHelper } from '../../helpers/joi-helper';

const userJoiObject = {
    login: Joi.string(),
    age: Joi.number().min(4).max(130),
    password: Joi.string()
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/)
};

export const userRequiredSchema = Joi.object<User>(
    JoiHelper.makeAllKeysRequired(userJoiObject)
);
export const userPartialSchema = Joi.object<User>(userJoiObject);
