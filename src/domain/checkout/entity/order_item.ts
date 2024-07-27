export default class OrderItem {
  private _productId: string;
  private _quantity: number;
  private _price: number;
  private _name: string;
  private _id: string;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;

    this.validade();
  }

  private validade(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required.');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required.');
    }

    if (this._productId.length === 0) {
      throw new Error('ProductId is required.');
    }

    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than zero.');
    }

    return true;
  }

  get price(): number {
    return this._price * this._quantity;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }
}
