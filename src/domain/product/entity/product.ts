import ProductInterface from './product.interface';

export default class Product implements ProductInterface {
  private _price: number;
  private _name: string;
  private _id: string;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validade();
  }

  private validade(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required.');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required.');
    }

    if (this._price < 0) {
      throw new Error('Price must be greater than or equal to zero.');
    }

    return true;
  }

  changePrice(price: number) {
    this._price = price;
    this.validade();
  }

  changeName(name: string) {
    this._name = name;
    this.validade();
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  get id() {
    return this._id;
  }
}
