import express from 'express';
import { UsersDatabase } from './users.database';
import { UsersController } from './users.controller';

const app = express();
const port = 3000;

const controller = new UsersController(new UsersDatabase());

app.use(express.json());

app.route(controller.PREFIX).get(controller.getAll).post(controller.createUser);

app.route(`${controller.PREFIX}/:id`)
    .get(controller.getUser)
    .post(controller.updateUser)
    .delete(controller.deleteUser);

app.route(`${controller.PREFIX}/search`).get(controller.getAutoSuggestUsers);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
