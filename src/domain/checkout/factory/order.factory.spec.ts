import { randomUUID as uuid } from 'node:crypto';

import OrderFactory from './order.factory';

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      items: [
        {
          name: 'Product 1',
          productId: uuid(),
          quantity: 1,
          id: uuid(),
          price: 100,
        },
      ],
      customerId: uuid(),
      id: uuid(),
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
