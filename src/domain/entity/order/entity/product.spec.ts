import Product from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const product = new Product('', 'Product Name', 100);
    }).toThrow('Id is required.');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const product = new Product('Product Id', '', 100);
    }).toThrow('Name is required.');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const product = new Product('Product Id', 'Product Name', -1);
    }).toThrow('Price must be greater than or equal to zero.');
  });

  it('should change name', () => {
    const product = new Product('id', 'Product name', 100);
    product.changeName('Name changed');

    expect(product.name).toBe('Name changed');
  });

  it('should change price', () => {
    const product = new Product('id', 'Product name', 100);
    product.changePrice(200);

    expect(product.price).toBe(200);
  });
});
