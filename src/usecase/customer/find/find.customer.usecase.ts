import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputFindCustomerDto, InputFindCustomerDto } from './find.customer.dto';

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

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
