const { Schema, model } = require("mongoose");

const BuySchema = Schema({
  fecha: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

BuySchema.methods.toJSON = function () {
  const { __v, password, _id, ...total } = this.toObject();
  return total;
};

module.exports = model("Buy", BuySchema);