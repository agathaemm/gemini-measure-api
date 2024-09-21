import { DataTypes, Model } from 'sequelize';
import sequelize from '../postgresConnection';
import { CustomerModel } from './customerModel';

export class MeasureModel extends Model {
  public id!: string; // UUID
  public customerId!: string;
  public datetime!: string;
  public type!: string;
  public value!: number | null;
}

MeasureModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: CustomerModel,
        key: 'id',
      },
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'measures',
    timestamps: true,
  },
);
