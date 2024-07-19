import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface';
import Address from '../../domain/entity/customer/value-object/address';
import Customer from '../../domain/entity/customer/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);

      customer.addRewardPoints(customerModel.rewardPoints);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
        customerModel.state,
        customerModel.country,
      );

      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city,
      customerModel.state,
      customerModel.country,
    );
    customer.changeAddress(address);

    return customer;
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        rewardPoints: entity.rewardPoints,
        country: entity.address.country,
        street: entity.address.street,
        number: entity.address.number,
        state: entity.address.state,
        city: entity.address.city,
        active: entity.isActive(),
        zip: entity.address.zip,
        name: entity.name,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      rewardPoints: entity.rewardPoints,
      country: entity.address.country,
      street: entity.address.street,
      number: entity.address.number,
      state: entity.address.state,
      city: entity.address.city,
      active: entity.isActive(),
      zip: entity.address.zip,
      name: entity.name,
      id: entity.id,
    });
  }
}
