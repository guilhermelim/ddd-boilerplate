import OrderItemModel from '../db/sequelize/model/order-item.model';
import Order from '../../domain/entity/order/entity/order';
import OrderModel from '../db/sequelize/model/order.model';

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
