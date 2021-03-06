import dotenv from 'dotenv';

dotenv.config();

import { app } from './bootstrap/app';
import { sequelize } from './bootstrap/sequelize';
import { UsersModule } from './modules/users';

app.route('/').get((req, res) => {
    res.send(
        `<style>a {color: #ef5b25; font-weight: 600; text-decoration: none;}</style><a href="${process.env.API_DOCS_URL}" target="_blank">Documentation page</a>`
    );
});

UsersModule.init();

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Sequelize: connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Sequelize: unable to connect to the database:', error);
    });
