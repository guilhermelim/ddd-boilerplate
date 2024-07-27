import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputCreateCustomerDto, InputCreateCustomerDto } from './create.customer.dto';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.state,
        input.address.country,
      ),
    );

    await this.customerRepository.create(customer);

    return {
      address: {
        country: customer.address.country,
        street: customer.address.street,
        number: customer.address.number,
        state: customer.address.state,
        city: customer.address.city,
        zip: customer.address.zip,
      },
      name: customer.name,
      id: customer.id,
    };
  }
}
