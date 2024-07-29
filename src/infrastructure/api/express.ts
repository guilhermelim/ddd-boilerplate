import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';

import CustomerModel from '../customer/repository/sequelize/model/customer.model';
import { customerRoute } from './routes/customer.route';

export const app: Express = express();
app.use(express.json());
app.use('/customer', customerRoute);

export let sequelize: Sequelize;

async function setupDB() {
  sequelize = new Sequelize({
    sync: { force: true },
    storage: ':memory:',
    dialect: 'sqlite',
    logging: false,
  });
  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}
setupDB();
