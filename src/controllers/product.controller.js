// productController class with depencency injection
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class ProductController {
  constructor({ ProductService }) {
    this.ProductService = ProductService;
    this.getProducts = this.getProducts.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProductById = this.updateProductById.bind(this);
    this.deleteProductById = this.deleteProductById.bind(this);
  }

  async createProduct(req, res) {
    try {
      const productBody = req.body;
      const newProduct = await this.ProductService.createProduct(productBody);
      res.status(httpStatus.CREATED).json(newProduct);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  // get all products
  async getProducts(req, res) {
    try {
      const products = await this.ProductService.getProducts();
      res.status(httpStatus.OK).json(products);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  // get product by id
  async getProductById(req, res) {
    try {
      const product = await this.ProductService.getProductById(req.params.id);
      res.status(httpStatus.OK).json(product);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  // update product
  async updateProductById(req, res) {
    try {
      const productBody = req.body;
      const product = await this.ProductService.updateProductById(req.params.id, productBody);
      res.status(httpStatus.OK).json(product);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }

  // delete product
  async deleteProductById(req, res) {
    try {
      const product = await this.ProductService.deleteProductById(req.params.id);
      res.status(httpStatus.OK).json(product);
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
  }
}

module.exports = ProductController;
