import { Request, Response } from 'express';
import { StatusCodes } from '../../types/status-codes';
import { User } from './user';
import { UsersService } from './users.service';

export class UsersController {
    readonly PREFIX = '/users';

    constructor(private readonly service: UsersService) {}

    getAll = async (req: Request, res: Response) => {
        res.send(await this.service.getAll());
    };

    getUser = async (req: Request<UserReqParams>, res: Response) => {
        const { id } = req.params;
        const user = await this.service.getUser(id);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    createUser = async ({ body }: Request<{}, {}, User>, res: Response) => {
        const user = await this.service.createUser(body);

        res.status(StatusCodes.Created).send(user);
    };

    updateUser = async (
        req: Request<UserReqParams, {}, Partial<User>>,
        res: Response
    ) => {
        const { body, params } = req;
        const { id } = params;
        const user = await this.service.updateUser(id, body);

        if (user) {
            res.send(user);
        } else {
            res.status(StatusCodes.NotFound).send(this.userNotFoundMessage(id));
        }
    };

    deleteUser = async (req: Request<UserReqParams>, res: Response) => {
        const { id } = req.params;
        await this.service.deleteUser(id);

        res.status(StatusCodes.NoContent).send();
    };

    getAutoSuggestUsers = async (
        req: Request<{}, {}, {}, AutoSuggestQueryParams>,
        res: Response
    ) => {
        const { loginSubstring, limit } = req.query;
        const users = await this.service.getAutoSuggestUsers(
            loginSubstring,
            limit
        );

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
