import { USERS_MOCK } from './mocks';
import { User } from './user';

export class UsersDatabase {
    private readonly users: User[] = USERS_MOCK;

    getAll(): User[] {
        return this.users;
    }

    findOne(id: string): User | undefined {
        return this.users.find((user) => user.id === +id);
    }

    updateOne(id: string, updatedUserFields: Partial<User>): User | undefined {
        const index = this.users.findIndex((user) => user.id === +id);

        if (index === -1) {
            return;
        }

        this.users[index] = { ...this.users[index], ...updatedUserFields };

        return this.users[index];
    }

    createOne(user: User): User {
        this.users.push(user);

        return user;
    }

    deleteOne(id: string): void {
        this.updateOne(id, { isDeleted: true });
    }

    getAutoSuggestUsers(loginSubstring: string, limit: string): User[] {
        return this.users
            .filter((user) => user.login.includes(loginSubstring))
            .sort((userA, userB) => (userA.login > userB.login ? 1 : -1))
            .slice(0, +limit);
    }
}
