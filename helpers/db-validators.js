const { Category, Product } = require("../models");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const Buy = require("../models/buy.model");

const isAValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist)
    throw new Error(`Role: ${role} is not registered in Database`);
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email already exist in DB`);
};

const userByIdExist = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) throw new Error(`the Id does not exist`);
};

const categoryExistById = async (id) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) throw new Error(`the category Id does not exist`);
};

const productExistById = async (id) => {
  const productExist = await Product.findById(id);
  if (!productExist) throw new Error(`the product Id does not exist`);
};

const allowedCollections = async (collection = "", collections = []) => {
  const isIncluded = collections.includes(collection);
  if (!isIncluded)
    throw new Error(
      `La collection ${collection} is not allowed, ${collections}`
    );
  return true;
  
};
const BuyExistById = async ( id ) =>{
  const BuyExist = await Buy.findById(id);

  if (!BuyExist) throw new Error(`the Buy Id does not exist`);
}

const DetailExistById = async ( id ) =>{
  const DetailExist = await Detail.findById(id);

  if (!DetailExist) throw new Error(`Detail Id does not exist`);
}

module.exports = {
  isAValidRole,
  emailExist,
  userByIdExist,
  categoryExistById,
  productExistById,
  allowedCollections,
  BuyExistById,
  DetailExistById
};
