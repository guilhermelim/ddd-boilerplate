import OrderItem from './order_item';
import Order from './order';

describe('Oder unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const order = new Order('', '1', []);
    }).toThrow('Id is required.');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const order = new Order('1', '', []);
    }).toThrow('CustomerId is required.');
  });

  it('should throw error when Items is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const order = new Order('1', '1', []);
    }).toThrow('Items are required.');
  });

  it('should calculate total', () => {
    const item1 = new OrderItem('Item Id 1', 'Name item 1', 100, 'Product id 1', 2);
    const item2 = new OrderItem('Item Id 2', 'N ame item 2', 200, 'Product id 2', 2);

    const order1 = new Order('Order Id 1', 'Customer Id 1', [item1]);
    const total = order1.total();
    expect(total).toBe(200);

    const order2 = new Order('Order Id 2', 'Customer Id 2', [item1, item2]);
    const total2 = order2.total();
    expect(total2).toBe(600);
  });

  it('should throw error when total is less than zero', () => {
    expect(() => {
      const item = new OrderItem('Order item Id 1', 'Order item Name', -1, 'Product id 1', 1);
      const order = new Order('Order Id 1', 'Customer Id 1', [item]);
      order.total();
    }).toThrow('Total must be greater than or equal to zero.');
  });
});
