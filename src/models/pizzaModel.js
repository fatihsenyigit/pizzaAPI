
'use strict'

const {mongoose} = require('../configs/dbConnection')

const passwordEncrypt = require('../helpers/passwordEncrypt');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  image: {
    type: String,
    // requied: true,
    trim: true,
  },

  price: {
    type: Number,
    default: 0,
    required: true,
  },

  // toppingIds: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Topping",
  //   required: true,
  // }, bu benim yaptigim

  toppingIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topping",
    },
  ],

}, {
  collation: 'pizzas', timestamps: true
});

module.exports = mongoose.model('Pizza', PizzaSchema)