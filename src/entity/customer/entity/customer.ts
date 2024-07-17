import Address from '../value-object/address';

export default class Customer {
  private _address!: Address;
  private _active = false;
  private _name: string;
  private _id: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required.');
    }

    if (!this.isValidFullName(this._name)) {
      throw new Error('Full name is required.');
    }
  }

  private isValidFullName(fullName: string): boolean {
    const regex = /\s+/;
    return fullName.trim().length > 0 && regex.test(fullName.trim());
  }

  private isValidAddress(address: Address): boolean {
    return address !== undefined;
  }

  activate() {
    if (!this.isValidAddress(this._address)) {
      throw new Error('Address is mandatory to activate a customer.');
    }
    this._active = true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  deactivate() {
    this._active = false;
  }

  get name(): string {
    return this._name;
  }
}
