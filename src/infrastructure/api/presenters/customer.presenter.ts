import { toXML } from 'jstoxml';

import { OutputListCustomerDto } from '../../../usecase/customer/list/list.customer.dto';

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOption = {
      allowEmpty: true,
      newline: '\n',
      header: true,
      indent: '  ',
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
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
        },
      },
      xmlOption,
    );
  }
}
