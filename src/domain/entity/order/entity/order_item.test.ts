import OrderItem from './order_item';

describe('Oder Item unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const item = new OrderItem('', 'Order item name', 100, 'Product id 1', 0);
    }).toThrow('Id is required.');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const item = new OrderItem('Order item id', '', 100, 'Product id 1', 0);
    }).toThrow('Name is required.');
  });

  it('should throw error when productId is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const item = new OrderItem('Order item id', 'Order item name', 100, '', 0);
    }).toThrow('ProductId is required.');
  });

  it('should throw error if the item qtd is less or equal zero', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const item = new OrderItem('Order item Id 1', 'Order item Name', 100, 'Product id 1', 0);
    }).toThrow('Quantity must be greater than zero.');
  });
});
