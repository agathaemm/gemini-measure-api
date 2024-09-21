import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresConnection';

export class CustomerModel extends Model {
  public id!: string; // UUID
  public name!: string;
  public email!: string;
}

CustomerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
  },
);
