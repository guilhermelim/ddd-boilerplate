import { Sequelize } from 'sequelize-typescript';

import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/model/customer.model';
import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import UpdateCustomerUseCase from './update.customer.usecase';

describe('Test update customer use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    // Create clients for testing
    const customer = new Customer('1', 'John Wick');
    const address = new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA');
    customer.changeAddress(address);

    // Saves clients to repository
    await customerRepository.create(customer);

    // Define as novas informações para o cliente
    const input = {
      address: {
        country: 'Country Updated',
        street: 'Street Updated',
        state: 'State Updated',
        city: 'City Updated',
        zip: 'Zip Updated',
        number: 1,
      },
      name: 'John Updated',
      id: customer.id,
    };

    // Execute the update use case
    const output = await usecase.execute(input);

    // Check if the client was updated correctly
    expect(output).toEqual(input);

    // Check if the client in the repository has been updated
    const updatedCustomer = await customerRepository.find(customer.id);

    expect(updatedCustomer.id).toBe(customer.id);
    expect(updatedCustomer.name).toBe('John Updated');
    expect(updatedCustomer.address.street).toBe('Street Updated');
    expect(updatedCustomer.address.number).toBe(1);
    expect(updatedCustomer.address.zip).toBe('Zip Updated');
    expect(updatedCustomer.address.city).toBe('City Updated');
    expect(updatedCustomer.address.state).toBe('State Updated');
    expect(updatedCustomer.address.country).toBe('Country Updated');
  });
});
