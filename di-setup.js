const awilix = require('awilix');
const ProductController = require('./src/controllers/product.controller');
const ProductService = require('./src/services/product.service');
const Product = require('./src/models/product.model');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function setup() {
  container.register({
    ProductController: awilix.asClass(ProductController),

    // services
    ProductService: awilix.asClass(ProductService),

    // models
    Product: awilix.asValue(Product),
  });
}

module.exports = {
  container,
  setup,
};
