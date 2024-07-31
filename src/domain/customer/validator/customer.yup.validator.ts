import * as yup from 'yup';

import ValidatorInterface from '../../@shared/validator/validator.interface';
import Customer from '../entity/customer';

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
  private validationData: { name: string; id: string };
  private schema: yup.ObjectSchema<unknown>;

  constructor() {
    this.schema = this.defineValidationRules();
  }

  private defineValidationRules(): yup.ObjectSchema<unknown> {
    const validationRules = {
      name: yup.string().test('required', 'Full name is required.', (fullName) => {
        const regex = /\s+/;
        return fullName ? regex.test(fullName.trim()) : false;
      }),
      id: yup.string().required('Id is required.'),
    };

    return yup.object().shape(validationRules);
  }

  private handleValidationErrors(entity: Customer, errors: yup.ValidationError): void {
    errors.errors.forEach((error) => {
      entity.notification.addError({
        context: 'customer',
        message: error,
      });
    });
  }

  private defineValidationData(entity: Customer): void {
    this.validationData = this.validationData = {
      name: entity.name,
      id: entity.id,
    };
  }

  validate(entity: Customer): void {
    try {
      this.defineValidationData(entity);
      this.schema.validateSync(this.validationData, { abortEarly: false });
    } catch (errors) {
      this.handleValidationErrors(entity, errors as yup.ValidationError);
    }
  }
}
