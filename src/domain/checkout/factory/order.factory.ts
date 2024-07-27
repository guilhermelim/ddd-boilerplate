import OrderItem from '../entity/order_item';
import Order from '../entity/order';

interface OrderFactoryProps {
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
    id: string;
  }[];
  customerId: string;
  id: string;
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    });

    return new Order(props.id, props.customerId, items);
  }
}
