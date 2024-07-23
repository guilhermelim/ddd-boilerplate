import { Sequelize } from 'sequelize-typescript';

import Product from '../../../../domain/product/entity/product';
import ProductRepository from './product.repository';
import ProductModel from './model/product.model';

describe('Product repository unit test', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      sync: { force: true },
      storage: ':memory',
      dialect: 'sqlite',
      logging: false,
    });

    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      name: 'Product 1',
      price: 100,
      id: '1',
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      name: 'Product 1',
      price: 100,
      id: '1',
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel2.toJSON()).toStrictEqual({
      name: 'Product 2',
      price: 200,
      id: '1',
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const foundProduct = await productRepository.find('1');

    expect(productModel.toJSON()).toStrictEqual({
      price: foundProduct.price,
      name: foundProduct.name,
      id: foundProduct.id,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product2);

    const products = [product, product2];
    const foundProducts = await productRepository.findAll();

    expect(products).toEqual(foundProducts);
  });
});
