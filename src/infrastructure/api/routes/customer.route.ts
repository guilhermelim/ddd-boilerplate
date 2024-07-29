import express, { Response, Request } from 'express';

import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      address: {
        country: req.body.address.country,
        street: req.body.address.street,
        number: req.body.address.number,
        state: req.body.address.state,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
      name: req.body.name,
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
