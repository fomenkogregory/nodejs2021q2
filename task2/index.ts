import express from 'express';
import { UsersDatabase } from './users.database';
import { UsersController } from './users.controller';

const app = express();
const port = 3000;

const controller = new UsersController(new UsersDatabase());

app.use(express.json());

app.get(controller.API_PREFIX, controller.getAll);
app.get(`${controller.API_PREFIX}/:id`, controller.getUser);
app.get(`${controller.API_PREFIX}/search`, controller.getAutoSuggestUsers);

app.post(controller.API_PREFIX, controller.createUser);
app.post(`${controller.API_PREFIX}/:id`, controller.updateUser);

app.delete(`${controller.API_PREFIX}/:id`, controller.deleteUser);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
