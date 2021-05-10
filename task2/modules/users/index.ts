import { app } from '../../bootstrap/app';
import { Validator } from '../../helpers/validator';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDatabase } from './users.database';
import { userPartialSchema, userRequiredSchema } from './user.schema';
import { Module } from '../../types/module';

export class UsersModule implements Module {
    public init(): void {
        const controller = new UsersController(
            new UsersService(new UsersDatabase())
        );

        app.route(controller.PREFIX)
            .get(controller.getAll)
            .post(
                Validator.validateAsync(userRequiredSchema),
                controller.createUser
            );

        app.route(`${controller.PREFIX}/search`).get(
            controller.getAutoSuggestUsers
        );

        app.route(`${controller.PREFIX}/:id`)
            .get(controller.getUser)
            .patch(
                Validator.validateAsync(userPartialSchema),
                controller.updateUser
            )
            .delete(controller.deleteUser);
    }
}
