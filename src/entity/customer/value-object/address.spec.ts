import Address from './address';

describe('Address unit tests', () => {
  it('should throw error when street is empty', () => {
    expect(() => {
      new Address('', 123, '10036', 'New York', 'NY', 'USA');
    }).toThrow('Street is required');
  });

  it('should throw error when number is less than or equal to zero', () => {
    expect(() => {
      new Address('21st Street', 0, '10036', 'New York', 'NY', 'USA');
    }).toThrow('Number must be greater than zero');

    expect(() => {
      new Address('21st Street', -1, '10036', 'New York', 'NY', 'USA');
    }).toThrow('Number must be greater than zero');
  });

  it('should throw error when zip is empty', () => {
    expect(() => {
      new Address('21st Street', 123, '', 'New York', 'NY', 'USA');
    }).toThrow('Zip is required');
  });

  it('should throw error when city is empty', () => {
    expect(() => {
      new Address('21st Street', 123, '10036', '', 'NY', 'USA');
    }).toThrow('City is required');
  });

  it('should throw error when state is empty', () => {
    expect(() => {
      new Address('21st Street', 123, '10036', 'New York', '', 'USA');
    }).toThrow('State is required');
  });

  it('should throw error when country is empty', () => {
    expect(() => {
      new Address('21st Street', 123, '10036', 'New York', 'NY', '');
    }).toThrow('Country is required');
  });

  it('should create address correctly', () => {
    const address = new Address('21st Street', 123, '10036', 'New York', 'NY', 'USA');

    expect(address.toString()).toBe('21st Street, 123, 10036, New York - NY, USA.');
  });
});
