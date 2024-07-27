import { Sequelize } from 'sequelize-typescript';

import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import CustomerModel from '../../../customer/repository/sequelize/model/customer.model';
import ProductModel from '../../../product/repository/sequelize/model/product.model';
import Address from '../../../../domain/customer/value-object/address';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Customer from '../../../../domain/customer/entity/customer';
import Product from '../../../../domain/product/entity/product';
import Order from '../../../../domain/checkout/entity/order';
import OrderItemModel from './model/order-item.model';
import OrderRepository from './order.repository';
import OrderModel from './model/order.model';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      sync: { force: true },
      storage: ':memory:',
      dialect: 'sqlite',
      logging: false,
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zip 1', 'City 1', 'State 1', 'Country 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem('1', product.name, product.price, product.id, 2);

    const order = new Order('123', '123', [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      items: [
        {
          quantity: ordemItem.quantity,
          price: ordemItem.price,
          name: ordemItem.name,
          product_id: '123',
          id: ordemItem.id,
          order_id: '123',
        },
      ],
      total: order.total(),
      customer_id: '123',
      id: '123',
    });
  });
});
