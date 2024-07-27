import CustomerFactory from './customer.factory';
import Address from '../value-object/address';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Wick');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Wick');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('21st Street', 123, '10036', 'New York', 'NY', 'USA');

    const customer = CustomerFactory.createWithAddress('John Wick', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Wick');
    expect(customer.address).toBe(address);
  });
});
