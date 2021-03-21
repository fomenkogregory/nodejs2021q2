import Joi from 'joi';
import { User } from './user';

export const userSchema = Joi.object<User>({
    id: Joi.number().required(),
    login: Joi.string().required(),
    age: Joi.number().required().min(4).max(130),
    password: Joi.string()
        .required()
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/)
});
