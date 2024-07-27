import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputListCustomerDto, InputListCustomerDto } from './list.customer.dto';
import Customer from '../../../domain/customer/entity/customer';

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => ({
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
      })),
    };
  }
}
