export interface InputListCustomerDto {}

interface Customer {
  address: {
    country: string;
    street: string;
    number: number;
    state: string;
    city: string;
    zip: string;
  };
  name: string;
  id: string;
}

export interface OutputListCustomerDto {
  customers: Customer[];
}
