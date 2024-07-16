import Address from './entity/customer/value-object/address';
import Customer from './entity/customer/entity/customer';
import OrderItem from './entity/order/entity/order_item';
import Order from './entity/order/entity/order';

const customer = new Customer('123', 'Guilherme Lima');
const address = new Address('Rua José Wellington Façanha', 300, '62870-000', 'Pacajus', 'Ceará', 'Brasil');
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10);
const item2 = new OrderItem('2', 'Item 2', 20);
const order = new Order('1', '123', [item1, item2]);

console.log('Order: ', order);
