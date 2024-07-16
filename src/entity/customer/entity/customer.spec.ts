import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer('', 'John Wick');
    }).toThrow('Id is required.');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer('1', '');
    }).toThrow('Full name is required.');
  });

  it('should change name', () => {
    const customer = new Customer('1', 'John Wick');
    customer.changeName('Jane Wick');

    expect(customer.name).toBe('Jane Wick');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'John Wick');
    const address = new Address('21st Street', 212, '10036', 'Nova York', 'NY', 'EUA');
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is empty when activating the customer', () => {
    expect(() => {
      const customer = new Customer('1', 'John Wick');
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer.');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Wick');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
});
