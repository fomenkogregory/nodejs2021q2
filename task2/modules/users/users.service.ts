import { UsersDatabase } from './users.database';
import { User } from './user';
import { UserModel } from './user.model';

export class UsersService {
    constructor(private readonly db: UsersDatabase) {}

    getAll(): Promise<UserModel[]> {
        return this.db.getAll();
    }

    getUser(id: string): Promise<UserModel | null> {
        return this.db.findOne(id);
    }

    createUser(user: User): Promise<UserModel> {
        return this.db.createOne(user);
    }

    updateUser(
        id: string,
        user: Partial<User>
    ): Promise<UserModel | undefined> {
        return this.db.updateOne(id, user);
    }

    deleteUser(id: string): Promise<UserModel | undefined> {
        return this.db.deleteOne(id);
    }

    getAutoSuggestUsers(
        loginSubstring: string,
        limit: string = '1'
    ): Promise<UserModel[]> {
        return this.db.getAutoSuggestUsers(loginSubstring, limit);
    }
}
