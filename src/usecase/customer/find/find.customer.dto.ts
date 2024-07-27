export interface InputFindCustomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
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
