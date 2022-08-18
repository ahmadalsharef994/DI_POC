const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ProductReviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    howToUse: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    sourcePinCode: {
      type: String,
      required: true,
    },
    sourceAddress: {
      type: String,
      required: true,
    },
    delevirablePinCodes: {
      type: Array,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
      default: 1,
      increment: true,
    },
    category: {
      type: String,
      required: true,
    },
    productReviews: {
      type: [ProductReviewsSchema],
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    totalRating: {
      type: Number,
      // default is a function of average of ratings
      default: 0,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(toJSON);
ProductSchema.plugin(paginate);

// create product model
const Product = mongoose.model('Product', ProductSchema);
// export product model
module.exports = Product;
