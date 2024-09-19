import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:123@localhost:5432/antares',
  {
    dialect: 'postgres',
    logging: false,
  },
);

export default sequelize;
