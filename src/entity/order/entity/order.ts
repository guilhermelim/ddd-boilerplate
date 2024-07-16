import OrderItem from './order_item';

export default class Order {
  _items: OrderItem[] = [];
  _customerId: string;
  _total: number;
  _id: string;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
  }

  private total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
