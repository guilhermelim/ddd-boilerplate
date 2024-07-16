export default class OrderItem {
  private _price: number;
  private _name: string;
  private _id: string;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
  }
}
