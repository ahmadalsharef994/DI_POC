const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');
const Server = require('../../src/app');

setupTestDB();
const { app } = new Server();

jest.setTimeout(30000);

describe('product routes', () => {
  let createdProductId;
  // write test for product routes
  describe('POST /products', () => {
    const productBody = {
      name: faker.commerce.productName(),
      brand: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      quantity: faker.datatype.number(),
      image: faker.image.imageUrl(),
      category: faker.commerce.product(),
      specifications: faker.lorem.paragraph(),
      rating: faker.datatype.number(),
      howToUse: faker.lorem.paragraph(),
      sourcePinCode: 'Source Pin Code 1',
      sourceAddress: 'Source Address 1',
      delevirablePinCodes: ['Delevirable Pin Code 1', 'Delevirable Pin Code 2'],
      quantityAvailable: 1,
    };
    it('should create a new product', async () => {
      const res = await request(app).post('/products').send(productBody);
      expect(res.status).toBe(httpStatus.CREATED);
      expect(res.body.name).toBe(productBody.name);
      expect(res.body.description).toBe(productBody.description);
      expect(res.body.image).toBe(productBody.image);
      createdProductId = res.body.id;
    });
  });

  describe('GET /products', () => {
    it('should get all products', async () => {
      const res = await request(app).get('/products');
      expect(res.status).toBe(httpStatus.OK);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /products/:id', () => {
    it('should get a product by id', async () => {
      // send request with path variable
      const res = await request(app).get(`/products/${createdProductId}`);
      expect(res.status).toBe(httpStatus.OK);
      expect(res.body.id).toBe(createdProductId);
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product by id', async () => {
      const productBody = {
        name: faker.commerce.productName(),
        brand: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price(),
        quantity: faker.datatype.number(),
        image: faker.image.imageUrl(),
        category: faker.commerce.product(),
        specifications: faker.lorem.paragraph(),
        rating: faker.datatype.number(),
        howToUse: faker.lorem.paragraph(),
        sourcePinCode: 'Source Pin Code 1',
        sourceAddress: 'Source Address 1',
        delevirablePinCodes: ['Delevirable Pin Code 1', 'Delevirable Pin Code 2'],
        quantityAvailable: 1,
      };
      const res = await request(app).put(`/products/${createdProductId}`).send(productBody);
      expect(res.status).toBe(httpStatus.OK);
      expect(res.body.name).toBe(productBody.name);
      expect(res.body.description).toBe(productBody.description);
      expect(res.body.image).toBe(productBody.image);
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product by id', async () => {
      const res = await request(app).delete(`/products/${createdProductId}`);
      expect(res.status).toBe(httpStatus.OK);
    });
  });
});
