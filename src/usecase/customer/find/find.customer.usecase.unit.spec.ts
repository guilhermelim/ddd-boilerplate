import Address from '../../../domain/customer/value-object/address';
import Customer from '../../../domain/customer/entity/customer';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('1', 'John Wick');
const address = new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

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

  it('should not find a customer', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '1',
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
