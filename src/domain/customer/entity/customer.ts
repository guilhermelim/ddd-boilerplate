import CustomerValidatorFactory from '../validator/customer.validator.factory';
import Entity from '../../@shared/entity/entity.abstract';
import Address from '../value-object/address';

export default class Customer extends Entity {
  private _address!: Address;
  private _rewardPoints = 0;
  private _active = false;
  private _name: string;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;

    this.validate();
    this.notification.notify();
  }

  private isValidAddress(address: Address): boolean {
    return address !== undefined;
  }

  private validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  activate() {
    if (!this.isValidAddress(this._address)) {
      this.notification.addError({
        message: 'Address is mandatory to activate a customer.',
        context: 'customer',
      });
    }
    this.notification.notify();

    this._active = true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
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

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  get name(): string {
    return this._name;
  }
}
