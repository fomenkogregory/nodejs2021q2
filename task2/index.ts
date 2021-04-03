import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Validator } from './validator';
import { UsersDatabase } from './users.database';
import { UsersController } from './users.controller';
import { userPartialSchema, userRequiredSchema } from './user.schemas';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

const controller = new UsersController(new UsersDatabase());

app.use(express.json());

app.route(controller.PREFIX)
    .get(controller.getAll)
    .post(Validator.validateAsync(userRequiredSchema), controller.createUser);

app.route(`${controller.PREFIX}/:id`)
    .get(controller.getUser)
    .patch(Validator.validateAsync(userPartialSchema), controller.updateUser)
    .delete(controller.deleteUser);

app.route(`${controller.PREFIX}/search`).get(controller.getAutoSuggestUsers);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

new Sequelize(process.env.DATABASE_URL ?? '', {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})
    .authenticate()
    .then(() =>
        console.log('Sequelize: connection has been established successfully.')
    )
    .catch((error) =>
        console.error('Sequelize: unable to connect to the database:', error)
    );
