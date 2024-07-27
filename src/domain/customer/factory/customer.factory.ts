import { randomUUID as uuid } from 'node:crypto';

import Address from '../value-object/address';
import Customer from '../entity/customer';

export default class CustomerFactory {
  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }

  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }
}
