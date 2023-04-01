const { response } = require("express");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const Buy = require("../models/buy.model");

const User = require("../models/buy.model");

const getBuy= async (req, res = response) => {
    const query = { status: true };
    const [products, total] = await Promise.all([
      Buy.find(query)
        .populate("user"),
      Buy.countDocuments(query),
    ]);
  
    res.status(200).json({
      total,
      products,
    });
  };

  const getBuyById = async (req = request, res = response) => {
    const { id } = req.params;
    const buy = await Buy.findById(id)
      .populate("user");
  
    res.status(200).json(buy);
  };

  const createBuy = async (req, res = response) => {
    const { fecha, user, total } = req.body;
  
    const data = {
      fecha:fecha,
      user: user,
      total:total
    };
  
    const buy = new Buy(data);
    await buy.save();
    res.status(200).json(buy);
  };

  const updateBuy = async (req, res) => {
    const { id } = req.params;
    const { fecha, user, total  } = req.body;
  
    const data = {
      fecha:fecha,
      user: user,
      total:total
    };
  
    const buy = await Buy.findByIdAndUpdate(id, data);
  
    res.status(200).json(buy);
  };

  const deleteBuy = async (req, res) => {
    const { id } = req.params;
    const deletedBuy = await Buy.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.json(deletedBuy);
  };
  
  module.exports = {
    getBuy,
    getBuyById,
    createBuy,
    updateBuy,
    deleteBuy,
  };