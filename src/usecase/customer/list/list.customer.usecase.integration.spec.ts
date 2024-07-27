import { Sequelize } from 'sequelize-typescript';

import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/model/customer.model';
import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import ListCustomerUseCase from './list.customer.usecase';

describe('Unit test for listing customer use case', () => {
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

  it('should list a customer', async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    // Create clients for testing
    const customer1 = new Customer('1', 'John Wick');
    const address1 = new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA');
    customer1.changeAddress(address1);

    const customer2 = new Customer('2', 'Jane Wick');
    const address2 = new Address('22nd Street', 213, '10036', 'Nova York', 'NY', 'EUA');
    customer2.changeAddress(address2);

    // Saves clients to repository
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.address.street);
    expect(output.customers[0].address.number).toBe(customer1.address.number);
    expect(output.customers[0].address.zip).toBe(customer1.address.zip);
    expect(output.customers[0].address.city).toBe(customer1.address.city);
    expect(output.customers[0].address.state).toBe(customer1.address.state);
    expect(output.customers[0].address.country).toBe(customer1.address.country);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.address.street);
    expect(output.customers[1].address.number).toBe(customer2.address.number);
    expect(output.customers[1].address.zip).toBe(customer2.address.zip);
    expect(output.customers[1].address.city).toBe(customer2.address.city);
    expect(output.customers[1].address.state).toBe(customer2.address.state);
    expect(output.customers[1].address.country).toBe(customer2.address.country);
  });
});
