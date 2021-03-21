import { Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';
import { StatusCodes } from './status-codes';
import { User } from './user';
import { UsersDatabase } from './users.database';

export class UsersController {
    readonly PREFIX = '/users';

    constructor(
        private readonly db: UsersDatabase,
        private readonly schema: Joi.ObjectSchema<User>
    ) {}

    getAll = (req: Request, res: Response) => {
        res.send(this.db.getAll());
    };

    getUser = (req: Request<UserReqParams>, res: Response) => {
        const { id } = req.params;
        const user = this.db.findOne(id);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    createUser = async (req: Request, res: Response) => {
        try {
            const validationResult = await this.schema.validateAsync<User>(
                req.body
            );
            const user = this.db.createOne(validationResult);

            res.status(StatusCodes.Created).send(user);
        } catch (error) {
            res.status(StatusCodes.BadRequest).send(
                (error as ValidationError).details[0].message
            );
        }
    };

    updateUser = (
        req: Request<UserReqParams, {}, Partial<User>>,
        res: Response
    ) => {
        const { id } = req.params;
        const user = this.db.updateOne(id, req.body);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    deleteUser = (req: Request<UserReqParams>, res: Response) => {
        this.db.deleteOne(req.params.id);

        res.status(StatusCodes.NoContent).send();
    };

    getAutoSuggestUsers = (
        req: Request<{}, {}, {}, AutoSuggestQueryParams>,
        res: Response
    ) => {
        const { loginSubstring, limit } = req.query;
        const users = this.db.getAutoSuggestUsers(loginSubstring, limit);

        res.send(users);
    };

    private userNotFoundMessage = (id: string) =>
        `User with id ${id} doesn't exist`;
}

type UserReqParams = {
    id: string;
};

type AutoSuggestQueryParams = {
    loginSubstring: string;
    limit: string;
};
