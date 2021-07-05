import { GroupsDatabase } from './groups.database';
import { GroupModel } from './group.model';
import { Group } from './models/group';

export class GroupsService {
    constructor(private readonly db: GroupsDatabase) {}

    getAll(): Promise<GroupModel[]> {
        return this.db.getAll();
    }

    getGroup(id: string): Promise<GroupModel | null> {
        return this.db.findOne(id);
    }

    createGroup(group: Group): Promise<GroupModel> {
        return this.db.createOne(group);
    }

    updateGroup(
        id: string,
        user: Partial<Group>
    ): Promise<GroupModel | undefined> {
        return this.db.updateOne(id, user);
    }

    deleteGroup(id: string): Promise<number> {
        return this.db.deleteOne(id);
    }
}
