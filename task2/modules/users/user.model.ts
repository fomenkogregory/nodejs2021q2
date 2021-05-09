import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../bootstrap/sequelize';
import { User } from './user';

export class UserModel extends Model<User> {}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        login: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        age: { type: DataTypes.INTEGER },
        isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { sequelize, tableName: 'users' }
);
UserModel.sync();
