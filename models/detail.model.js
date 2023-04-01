const { Schema, model } = require("mongoose");

const DetailSchema = Schema({
    buy: {
      type: Schema.Types.ObjectId,
      ref: "Buy",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  });
  
  DetailSchema.methods.toJSON = function () {
    const { __v, password, _id, ...total } = this.toObject();
    return total;
  };
  
  module.exports = model("Detail", DetailSchema);