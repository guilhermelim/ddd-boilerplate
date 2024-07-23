import Order from '../../../../domain/checkout/entity/order';
import OrderItemModel from './model/order-item.model';
import OrderModel from './model/order.model';

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        items: entity.items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          id: item.id,
        })),
        customer_id: entity.customerId,
        total: entity.total(),
        id: entity.id,
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }
}
