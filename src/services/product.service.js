const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class ProductService {
  // create a product
  constructor({ Product }) {
    this.Product = Product;
  }

  // method to create product
  async createProduct(productBody) {
    try {
      const newProduct = await this.Product.create(productBody);

      return newProduct;
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  // get product by id
  async getProductById(id) {
    const product = await this.Product.findById(id);
    return product;
  }

  // update product by id
  async updateProductById(id, productBody) {
    const product = await this.Product.findById(id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.set(productBody);
    await product.save();
    return product;
  }

  // get all products
  async getProducts() {
    const products = await this.Product.find();
    return products;
  }

  // delete product by id
  async deleteProductById(id) {
    // delete Product by id
    const product = await this.Product.findById(id);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.remove();
    return product;
  }
}
module.exports = ProductService;
