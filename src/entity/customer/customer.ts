import Address from "./value-object/address";

class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate() {
    if (!this.isValidId(this._id)) {
      throw new Error("Id is required.");
    }

    if (!this.isValidFullName(this._name)) {
      throw new Error("Full name is required.");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  set Address(address: Address) {
    this._address = address;
  }

  activate() {
    if (!this.isValidAddress(this._address)) {
      throw new Error("Address is mandatory to activate a customer.");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  private isValidId(id: string): boolean {
    return id.length !== 0;
  }

  private isValidFullName(fullName: string): boolean {
    const regex = /\s+/;
    return fullName.trim().length > 0 && regex.test(fullName.trim());
  }

  private isValidAddress(address: Address): boolean {
    return address !== undefined;
  }
}

const guilherme = new Customer("1", "Guilherme Lima");
