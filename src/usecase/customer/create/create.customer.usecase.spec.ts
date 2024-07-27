import CreateCustomerUseCase from './create.customer.usecase';

const input = {
  address: {
    street: '21st Street',
    city: 'Nova York',
    country: 'EUA',
    zip: '10036',
    number: 212,
    state: 'NY',
  },
  name: 'John Wick',
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
  };
};

describe('Unit test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      address: {
        country: input.address.country,
        street: input.address.street,
        number: input.address.number,
        state: input.address.state,
        city: input.address.city,
        zip: input.address.zip,
      },
      id: expect.any(String),
      name: input.name,
    });
  });

  it('should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, name: '' };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Full name is required.');
  });

  it('should thrown an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, street: '' } };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Street is required.');
  });

  it('should thrown an error when city is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, city: '' } };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('City is required.');
  });

  it('should thrown an error when country is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, country: '' } };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Country is required.');
  });

  it('should thrown an error when zip is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, zip: '' } };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Zip is required.');
  });

  it('should thrown an error when number is zero or less', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, zip: '' } };

    testInput.address.number = 0;

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Number must be greater than zero.');

    testInput.address.number = -1;

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('Number must be greater than zero.');
  });

  it('should thrown an error when state is missing', async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const testInput = { ...input, address: { ...input.address, state: '' } };

    await expect(customerCreateUseCase.execute(testInput)).rejects.toThrow('State is required.');
  });
});
