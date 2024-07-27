import { Sequelize } from 'sequelize-typescript';

import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/model/customer.model';
import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('1', 'John Wick');
    const address = new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: '1',
    };

    const output = {
      address: {
        street: '21st Street',
        city: 'Nova York',
        country: 'EUA',
        zip: '10036',
        number: 212,
        state: 'NY',
      },
      name: 'John Wick',
      id: '1',
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
