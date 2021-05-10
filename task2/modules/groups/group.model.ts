import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../bootstrap/sequelize';
import { Group } from './models/group';

export class GroupModel extends Model<Group> {}

GroupModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING },
        permissions: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    { sequelize, tableName: 'groups' }
);
GroupModel.sync();
