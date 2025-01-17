import ValidatorInterface from '../../@shared/validator/validator.interface';
import CustomerYupValidator from './customer.yup.validator';
import Customer from '../entity/customer';

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
