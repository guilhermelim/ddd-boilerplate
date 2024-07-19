import { Sequelize } from 'sequelize-typescript';

import Address from '../../domain/entity/customer/value-object/address';
import Customer from '../../domain/entity/customer/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe('Customer repository test', () => {
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

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zip 1', 'City 1', 'state', 'country');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),
      country: address.country,
      street: address.street,
      number: address.number,
      state: address.state,
      name: customer.name,
      city: address.city,
      zip: address.zip,
      id: '1',
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zip 1', 'City 1', 'state', 'country');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName('Customer 2');
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),
      country: address.country,
      street: address.street,
      number: address.number,
      state: address.state,
      name: customer.name,
      city: address.city,
      zip: address.zip,
      id: '1',
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zip 1', 'City 1', 'State', 'Country');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('this id does not exist');
    }).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zip 1', 'City 1', 'State 1', 'Country 1');
    customer1.changeAddress(address);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('Street 2', 2, 'Zip 2', 'City 2', 'State 2', 'Country 2');
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
