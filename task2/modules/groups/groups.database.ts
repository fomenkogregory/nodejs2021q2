import { GroupModel } from './group.model';
import { Group } from './models/group';

export class GroupsDatabase {
    async getAll(): Promise<GroupModel[]> {
        return await GroupModel.findAll();
    }

    async findOne(id: string): Promise<GroupModel | null> {
        return await GroupModel.findOne({ where: { id: +id } });
    }

    async updateOne(
        id: string,
        fields: Partial<Group>
    ): Promise<GroupModel | undefined> {
        const record = await this.findOne(id);
        return await record?.update(fields);
    }

    async createOne(user: Group): Promise<GroupModel> {
        return await GroupModel.create(user);
    }

    async deleteOne(id: string): Promise<number> {
        return await GroupModel.destroy({ where: { id: +id } });
    }
}
