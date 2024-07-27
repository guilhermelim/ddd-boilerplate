export default interface ProductInterface {
  changePrice(price: number): void;
  changeName(name: string): void;
  readonly price: number;

  readonly name: string;
  readonly id: string;
}
