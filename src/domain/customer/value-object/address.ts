export default class Address {
  private readonly _country: string;
  private readonly _number: number;
  private readonly _street: string;
  private readonly _state: string;
  private readonly _city: string;
  private readonly _zip: string;

  constructor(street: string, number: number, zip: string, city: string, state: string, country: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._state = state;
    this._country = country;

    this.validate();
  }

  private validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }

    if (this._number <= 0) {
      throw new Error('Number must be greater than zero');
    }

    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }

    if (this._city.length === 0) {
      throw new Error('City is required');
    }

    if (this._state.length === 0) {
      throw new Error('State is required');
    }

    if (this._country.length === 0) {
      throw new Error('Country is required');
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip}, ${this._city} - ${this._state}, ${this._country}.`;
  }

  get country(): string {
    return this._country;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get state(): string {
    return this._state;
  }

  get city(): string {
    return this._city;
  }

  get zip(): string {
    return this._zip;
  }
}
