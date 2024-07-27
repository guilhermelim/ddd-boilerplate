import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputUpdateCustomerDto, InputUpdateCustomerDto } from './update.customer.dto';
import Address from '../../../domain/customer/value-object/address';

export default class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;
  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.CustomerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.state,
        input.address.country,
      ),
    );
    await this.CustomerRepository.update(customer);

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
