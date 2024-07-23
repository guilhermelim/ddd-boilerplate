import OrderItem from './order_item';

export default class Order {
  private _items: OrderItem[] = [];
  private _customerId: string;
  private _total: number;
  private _id: string;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validade();
  }

  private validade(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required.');
    }

    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required.');
    }

    if (this._items.length === 0) {
      throw new Error('Items are required.');
    }

    if (this._total < 0) {
      throw new Error('Total must be greater than or equal to zero.');
    }

    return true;
  }

  total(): number {
    this._total = this._items.reduce((acc, item) => acc + item.price, 0);
    this.validade();

    return this._total;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get id(): string {
    return this._id;
  }
}
