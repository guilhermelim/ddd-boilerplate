export interface InputUpdateCustomerDto {
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

export interface OutputUpdateCustomerDto {
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
