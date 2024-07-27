export interface InputCreateCustomerDto {
  address: {
    country: string;
    street: string;
    number: number;
    state: string;
    city: string;
    zip: string;
  };
  name: string;
}

export interface OutputCreateCustomerDto {
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
