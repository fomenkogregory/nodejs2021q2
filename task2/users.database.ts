import { User } from './user';
import { UserModel } from './user.model';
import { Op } from 'sequelize';
import { Order } from './order';

export class UsersDatabase {
    async getAll(): Promise<UserModel[]> {
        return await UserModel.findAll();
    }

    async findOne(id: string): Promise<UserModel | null> {
        return await UserModel.findOne({ where: { id: +id } });
    }

    async updateOne(
        id: string,
        fields: Partial<User>
    ): Promise<UserModel | undefined> {
        const record = await this.findOne(id);
        return await record?.update(fields);
    }

    async createOne(user: User): Promise<UserModel> {
        return await UserModel.create(user);
    }

    async deleteOne(id: string): Promise<UserModel | undefined> {
        return await this.updateOne(id, { isDeleted: true });
    }

    async getAutoSuggestUsers(loginSubstring: string, limit: string) {
        return await UserModel.findAll({
            where: { login: { [Op.iLike]: `%${loginSubstring}%` } },
            order: [['login', Order.Desc]],
            limit: +limit
        });
    }
}
