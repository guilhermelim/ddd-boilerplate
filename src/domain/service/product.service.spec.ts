import Product from '../entity/order/entity/product';
import ProductService from './product.service';

describe('Product service unit test', () => {
  it('should change the prices of al products', () => {
    const product1 = new Product('Product id', 'name', 10);
    const product2 = new Product('Product id 2', 'name 2', 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
