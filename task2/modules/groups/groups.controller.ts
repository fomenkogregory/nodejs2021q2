import { Request, Response } from 'express';
import { StatusCodes } from '../../types/status-codes';
import { GroupsService } from './groups.service';
import { Group } from './models/group';

export class GroupsController {
    readonly PREFIX = '/groups';

    constructor(private readonly service: GroupsService) {}

    getAll = async (req: Request, res: Response) => {
        res.send(await this.service.getAll());
    };

    getGroup = async (req: Request<GroupReqParams>, res: Response) => {
        const { id } = req.params;
        const group = await this.service.getGroup(id);

        if (group) {
            res.send(group);
        } else {
            res.status(StatusCodes.NotFound).send(
                this.groupNotFoundMessage(id)
            );
        }
    };

    createGroup = async ({ body }: Request<{}, {}, Group>, res: Response) => {
        const group = await this.service.createGroup(body);

        res.status(StatusCodes.Created).send(group);
    };

    updateGroup = async (
        req: Request<GroupReqParams, {}, Partial<Group>>,
        res: Response
    ) => {
        const { body, params } = req;
        const { id } = params;
        const group = await this.service.updateGroup(id, body);

        if (group) {
            res.send(group);
        } else {
            res.status(StatusCodes.NotFound).send(
                this.groupNotFoundMessage(id)
            );
        }
    };

    deleteGroup = async (req: Request<GroupReqParams>, res: Response) => {
        const { id } = req.params;
        await this.service.deleteGroup(id);

        res.status(StatusCodes.NoContent).send();
    };

    private groupNotFoundMessage = (id: string) =>
        `Group with id ${id} doesn't exist`;
}

type GroupReqParams = {
    id: string;
};
