import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';

const customer1 = CustomerFactory.createWithAddress(
  'John Wick',
  new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA'),
);
const customer2 = CustomerFactory.createWithAddress(
  'Jane Wick',
  new Address('22st Street', 213, '10036', 'Nova York', 'NY', 'EUA'),
);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
  };
};

describe('Unit test for listing customer use case', () => {
  it('should list a customer', async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);

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
