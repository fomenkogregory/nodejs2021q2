import Joi from 'joi';

export class JoiHelper {
    static makeAllKeysRequired(object: Record<string, Joi.AnySchema>) {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => [
                key,
                value.required()
            ])
        );
    }
}
