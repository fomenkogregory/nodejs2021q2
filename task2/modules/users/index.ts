import { UsersController } from './users.controller';
import { UsersDatabase } from './users.database';
import { app } from '../../bootstrap/app';
import { Validator } from '../../helpers/validator';
import { userPartialSchema, userRequiredSchema } from './user.schema';

export class UsersModule {
    static init(): void {
        const controller = new UsersController(new UsersDatabase());

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
