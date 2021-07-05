import { app } from '../../bootstrap/app';
import { Validator } from '../../helpers/validator';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupsDatabase } from './groups.database';
import { groupPartialSchema, groupRequiredSchema } from './group.schema';
import { Module } from '../../types/module';

export class GroupsModule implements Module {
    public init(): void {
        const controller = new GroupsController(
            new GroupsService(new GroupsDatabase())
        );

        app.route(controller.PREFIX)
            .get(controller.getAll)
            .post(
                Validator.validateAsync(groupRequiredSchema),
                controller.createGroup
            );

        app.route(`${controller.PREFIX}/:id`)
            .get(controller.getGroup)
            .patch(
                Validator.validateAsync(groupPartialSchema),
                controller.updateGroup
            )
            .delete(controller.deleteGroup);
    }
}
