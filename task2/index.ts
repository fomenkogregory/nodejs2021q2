import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import { sequelize } from './sequelize';
import { Validator } from './validator';
import { UsersDatabase } from './users.database';
import { UsersController } from './users.controller';
import { userPartialSchema, userRequiredSchema } from './user.schema';

const app = express();
const port = process.env.PORT ?? 3000;

const controller = new UsersController(new UsersDatabase());

app.use(express.json());

app.route('/').get((req, res) => {
    res.send(
        `<style>a {color: #ef5b25; font-weight: 600; text-decoration: none;}</style><a href="${process.env.API_DOCS_URL}" target="_blank">Documentation page</a>`
    );
});

app.route(controller.PREFIX)
    .get(controller.getAll)
    .post(Validator.validateAsync(userRequiredSchema), controller.createUser);

app.route(`${controller.PREFIX}/search`).get(controller.getAutoSuggestUsers);

app.route(`${controller.PREFIX}/:id`)
    .get(controller.getUser)
    .patch(Validator.validateAsync(userPartialSchema), controller.updateUser)
    .delete(controller.deleteUser);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

sequelize
    .authenticate()
    .then(() =>
        console.log('Sequelize: connection has been established successfully.')
    )
    .catch((error) =>
        console.error('Sequelize: unable to connect to the database:', error)
    );
