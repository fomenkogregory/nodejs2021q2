import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../types/status-codes';
import { ValidationError, ObjectSchema } from 'joi';

export class Validator {
    static validateAsync = (schema: ObjectSchema) => async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await schema.validateAsync(req.body);

            return next();
        } catch (error) {
            res.status(StatusCodes.BadRequest).send(
                (error as ValidationError).details[0].message
            );
        }
    };
}
