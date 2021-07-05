import Joi from 'joi';
import { Group } from './models/group';
import { JoiHelper } from '../../helpers/joi-helper';
import { permissions } from './models/permissions';

const groupJoiObject = {
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string().valid(...permissions))
};

export const groupRequiredSchema = Joi.object<Group>(
    JoiHelper.makeAllKeysRequired(groupJoiObject)
);
export const groupPartialSchema = Joi.object<Group>(groupJoiObject);
