
'use strict'

const {mongoose} = require('../configs/dbConnection')

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
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema)