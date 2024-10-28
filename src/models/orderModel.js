
'use strict'

const {mongoose} = require('../configs/dbConnection')

// const PizzaSizeEnum = {
//   SMALL: "Small",
//   MEDIUM: "Medium",
//   LARGE: "Large",
//   XLARGE: "XLarge",
// };

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },

    size: {
      type: String,
      trim: true,
      required: true,
      enum: {
        values: ["small", "medium", "large"],
        message: "small, medium, large dan birini sec",
      },
      default: "medium",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },

    totalPrice: {
      type: Number,
      default: function () {
        return this.quantity * this.price;
      }, // Create
      transform: function () {
        return this.quantity * this.price;
      }, //Update
    },
  },
  {
    collection: "orders",
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema)