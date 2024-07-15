class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;

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

  activate() {
    if (!this.isValidAddress(this._address)) {
      throw new Error("Address is mandatory to activate a customer.");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  private isValidId(fullName: string): boolean {
    return this._id.length !== 0;
  }

  private isValidFullName(fullName: string): boolean {
    // Regex para validar que o nome completo contém pelo menos um espaço
    const regex = /\s+/;
    return fullName.trim().length > 0 && regex.test(fullName.trim());
  }

  private isValidAddress(address: string): boolean {
    // Regex para validar que o nome completo contém pelo menos um espaço
    return address.length !== 0;
  }
}

const guilherme = new Customer(
  "1",
  "Guilherme Lima",
  "Rua José Wellington Façanha, 300, Pacajus-CE, 62870-000, Brasil."
);
