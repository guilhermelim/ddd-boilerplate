import { randomUUID as uuid } from 'node:crypto';

import ProductInterface from '../entity/product.interface';
import ProductB from '../entity/product-b';
import Product from '../entity/product';

export default class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a':
        return new Product(uuid(), name, price);
      case 'b':
        return new ProductB(uuid(), name, price);
      default:
        throw new Error('Product type not supported');
    }
  }
}
