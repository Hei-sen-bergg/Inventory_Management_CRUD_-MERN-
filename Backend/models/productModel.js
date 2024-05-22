const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9]{12}$/.test(v);  // Ensures barcode is 12 alphanumeric characters
      },
      message: props => `${props.value} is not a valid barcode! It should be exactly 12 alphanumeric characters.`
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;