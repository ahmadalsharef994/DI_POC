const mongoose = require('mongoose');
const Product = require('./product.model');
const Package = require('./package.model');
const User = require('./user.model');
const { toJSON, paginate } = require('./plugins');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    // array of products
    products: {
      type: [Product],
    },
    // array of packages
    packages: {
      type: [Package],
    },
    totalCart: {
      type: Number,
      default() {
        return (
          this.products.reduce((product) => product.price, 0) + this.packages.reduce((onePackage) => onePackage.price, 0)
        ); // package is reserved keyword
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

CartSchema.plugin(toJSON);
CartSchema.plugin(paginate);

module.exports = mongoose.model('Cart', CartSchema);
