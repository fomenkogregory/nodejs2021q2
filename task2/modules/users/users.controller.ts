import { Request, Response } from 'express';
import { StatusCodes } from '../../types/status-codes';
import { User } from './user';
import { UsersDatabase } from './users.database';

export class UsersController {
    readonly PREFIX = '/users';

    constructor(private readonly db: UsersDatabase) {}

    getAll = async (req: Request, res: Response) => {
        res.send(await this.db.getAll());
    };

    getUser = async (req: Request<UserReqParams>, res: Response) => {
        const { id } = req.params;
        const user = await this.db.findOne(id);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    createUser = async (req: Request<{}, {}, User>, res: Response) => {
        const user = await this.db.createOne(req.body);

        res.status(StatusCodes.Created).send(user);
    };

    updateUser = async (
        req: Request<UserReqParams, {}, Partial<User>>,
        res: Response
    ) => {
        const { id } = req.params;
        const user = await this.db.updateOne(id, req.body);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    deleteUser = async (req: Request<UserReqParams>, res: Response) => {
        await this.db.deleteOne(req.params.id);

        res.status(StatusCodes.NoContent).send();
    };

    getAutoSuggestUsers = async (
        req: Request<{}, {}, {}, AutoSuggestQueryParams>,
        res: Response
    ) => {
        const { loginSubstring, limit } = req.query;
        const users = await this.db.getAutoSuggestUsers(loginSubstring, limit);

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
