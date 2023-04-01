const { response } = require("express");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const Detail = require("../models/detail.model");
const Product = require("../models/product.model");
const Buy = require("../models/buy.model");



const getDetail= async (req, res = response) => {
    const query = { status: true };
    const [quantity, total] = await Promise.all([
      Detail.find(query)
        .populate("product")
        .populate({path:"buy", populate:{path:"user"}}),
      Detail.countDocuments(query),
    ]);
  
    res.status(200).json({
      total,
      quantity,
    });
  };

  const getDetailById = async (req = request, res = response) => {
    const { id } = req.params;
    const detail = await Detail.findById(id)
      .populate("buy");
  
    res.status(200).json(detail);
  };

  const createDetail = async (req, res = response) => {
    const { buy, product, quantity } = req.body;
  
    const {precio} = await Product.findById(product); 
    const total = quantity*precio;
    const countDetailByBuy = await Buy.countDocuments({buy:buy})
    if (countDetailByBuy === 10){
        return res.status(400).json({Error:"10 product alrigth exist"})
    }
    if (quantity === 7 ){
        return res.status(400).json({Error:"only 7 units are allowed"})
    }

    const data = {
         total, buy, product, quantity

    };

    const FindBuy = await Buy.findById(buy);

    const NewBuyTotal = FindBuy.total + total

    const UpdatedBuy = await Buy.findByIdAndUpdate(buy, {total:NewBuyTotal})
  
    const detail = new Detail(data);
    await detail.save();
    res.status(200).json(detail);
  };

  const updateDetail = async (req, res) => {
    const { id } = req.params;
    const { buy, product, quantity } = req.body;
    const {precio} = await Product.findById(product); 
    const total = quantity*precio;
    if (quantity === 7 ){
        return res.status(400).json({Error:"only 7 units are must"})
    }

    const data = {
         total, buy, product, quantity

    };

    const FindBuy = await Buy.findById(buy);

    const NewBuyTotal = FindBuy.total + total

    const UpdatedBuy = await Buy.findByIdAndUpdate(buy, {total:NewBuyTotal})
  
    const detail = await Detail.findByIdAndUpdate(id, data);
    res.status(200).json(detail);
  };

  const deleteDetail = async (req, res) => {
    const { id } = req.params;
    const deletedDetail = await Detail.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json(deletedDetail);
  };
  
  module.exports = {
    getDetail,
    getDetailById,
    createDetail,
    updateDetail,
    deleteDetail,
  };