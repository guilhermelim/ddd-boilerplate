import request from 'supertest';

import { sequelize, app } from '../express';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '21st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 212,
          state: 'NY',
        },
        name: 'John Wick',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Wick');
    expect(response.body.address.street).toBe('21st Street');
    expect(response.body.address.city).toBe('Nova York');
    expect(response.body.address.country).toBe('EUA');
    expect(response.body.address.zip).toBe('10036');
    expect(response.body.address.number).toBe(212);
    expect(response.body.address.state).toBe('NY');
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John Wick',
    });
    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '21st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 212,
          state: 'NY',
        },
        name: 'John Wick',
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '22st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 213,
          state: 'NY',
        },
        name: 'Jane Wick',
      });
    expect(response2.status).toBe(200);
    const listResponse = await request(app).get('/customer').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe('John Wick');
    expect(customer.address.street).toBe('21st Street');

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe('Jane Wick');
    expect(customer2.address.street).toBe('22st Street');

    const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml').send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);

    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Wick</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>22st Street</street>`);
    expect(listResponseXML.text).toContain(`<city>Nova York</city>`);
    expect(listResponseXML.text).toContain(`<country>EUA</country>`);
    expect(listResponseXML.text).toContain(`<zip>10036</zip>`);
    expect(listResponseXML.text).toContain(`<number>213</number>`);
    expect(listResponseXML.text).toContain(`<state>NY</state>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);

    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>Jane Wick</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>21st Street</street>`);
    expect(listResponseXML.text).toContain(`<city>Nova York</city>`);
    expect(listResponseXML.text).toContain(`<country>EUA</country>`);
    expect(listResponseXML.text).toContain(`<zip>10036</zip>`);
    expect(listResponseXML.text).toContain(`<number>212</number>`);
    expect(listResponseXML.text).toContain(`<state>NY</state>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);

    expect(listResponseXML.text).toContain(`</customers>`);
  });

  it('should list all customers as JSON by default', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '21st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 212,
          state: 'NY',
        },
        name: 'John Wick',
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '22st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 213,
          state: 'NY',
        },
        name: 'Jane Wick',
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/customer').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe('John Wick');
    expect(customer.address.country).toBe('EUA');
    expect(customer.address.street).toBe('21st Street');
    expect(customer.address.number).toBe(212);
    expect(customer.address.state).toBe('NY');
    expect(customer.address.city).toBe('Nova York');
    expect(customer.address.zip).toBe('10036');

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe('Jane Wick');
    expect(customer2.address.country).toBe('EUA');
    expect(customer2.address.street).toBe('22st Street');
    expect(customer2.address.number).toBe(213);
    expect(customer2.address.state).toBe('NY');
    expect(customer2.address.city).toBe('Nova York');
    expect(customer2.address.zip).toBe('10036');
  });

  it('should list all customers as JSON with Accept header', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '21st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 212,
          state: 'NY',
        },
        name: 'John Wick',
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '22st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 213,
          state: 'NY',
        },
        name: 'Jane Wick',
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/customer').set('Accept', 'application/json').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer = listResponse.body.customers[0];
    expect(customer.name).toBe('John Wick');
    expect(customer.address.country).toBe('EUA');
    expect(customer.address.street).toBe('21st Street');
    expect(customer.address.number).toBe(212);
    expect(customer.address.state).toBe('NY');
    expect(customer.address.city).toBe('Nova York');
    expect(customer.address.zip).toBe('10036');

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe('Jane Wick');
    expect(customer2.address.country).toBe('EUA');
    expect(customer2.address.street).toBe('22st Street');
    expect(customer2.address.number).toBe(213);
    expect(customer2.address.state).toBe('NY');
    expect(customer2.address.city).toBe('Nova York');
    expect(customer2.address.zip).toBe('10036');
  });

  it('should list all customers as XML when Accept header is set to application/xml', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '21st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 212,
          state: 'NY',
        },
        name: 'John Wick',
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post('/customer')
      .send({
        address: {
          street: '22st Street',
          city: 'Nova York',
          country: 'EUA',
          zip: '10036',
          number: 213,
          state: 'NY',
        },
        name: 'Jane Wick',
      });
    expect(response2.status).toBe(200);

    const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml').send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);

    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Wick</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>22st Street</street>`);
    expect(listResponseXML.text).toContain(`<city>Nova York</city>`);
    expect(listResponseXML.text).toContain(`<country>EUA</country>`);
    expect(listResponseXML.text).toContain(`<zip>10036</zip>`);
    expect(listResponseXML.text).toContain(`<number>213</number>`);
    expect(listResponseXML.text).toContain(`<state>NY</state>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);

    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>Jane Wick</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>21st Street</street>`);
    expect(listResponseXML.text).toContain(`<city>Nova York</city>`);
    expect(listResponseXML.text).toContain(`<country>EUA</country>`);
    expect(listResponseXML.text).toContain(`<zip>10036</zip>`);
    expect(listResponseXML.text).toContain(`<number>212</number>`);
    expect(listResponseXML.text).toContain(`<state>NY</state>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);

    expect(listResponseXML.text).toContain(`</customers>`);
  });
});
