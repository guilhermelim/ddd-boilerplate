import Customer from '../../customer/entity/customer';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';
import Order from '../entity/order';

describe('Order service unit test', () => {
  it('should throw error when placing order without items', () => {
    const customer = new Customer('id', 'Customer Name');

    expect(() => {
      OrderService.placeOrder(customer, []);
    }).toThrow('Order must have at least one item');
  });

  it('should place an order', () => {
    const customer = new Customer('id', 'Customer Name');
    const item = new OrderItem('id', 'Item Name', 10, 'productId1', 1);
    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('should get total of all orders', () => {
    const item1 = new OrderItem('id1', 'item1', 100, 'productId1', 1);
    const item2 = new OrderItem('id2', 'item2', 200, 'productId2', 2);

    const order1 = new Order('id1', 'customerId1', [item1]);
    const order2 = new Order('id2', 'customerId2', [item2]);

    const totalOders = OrderService.total([order1, order2]);
    expect(totalOders).toBe(500);
  });

  it('should add reward points', () => {
    const customer = new Customer('id', 'Customer Name');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
