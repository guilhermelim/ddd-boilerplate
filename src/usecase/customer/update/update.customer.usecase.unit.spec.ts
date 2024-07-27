import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John Wick',
  new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA'),
);

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

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
