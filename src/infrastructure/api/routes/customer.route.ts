import express, { Response, Request } from 'express';

import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CustomerPresenter from '../presenters/customer.presenter';

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

function resFormat({ json, xml }: { json: () => void; xml?: () => void }) {
  return (req: Request) => {
    const acceptHeader: string = req.headers['accept'];

    switch (acceptHeader) {
      case 'application/xml':
        xml();
        break;
      case 'application/json':
        json();
        break;
      default:
        json();
    }
  };
}

customerRoute.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});

    resFormat({
      xml: async () => res.send(CustomerPresenter.listXML(output)),
      json: async () => res.send(output),
    })(req);
  } catch (error) {
    res.status(500).send(error);
  }
});
