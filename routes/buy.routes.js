const { Router } = require("express");
const { check } = require("express-validator");

const {
    validateFields,
    validateJWT,
    
  } = require("../middleware");
  
  const {
    userByIdExist,
    BuyExistById,
  } = require("../helpers/db-validators");
  
  const {
    getBuy,
    getBuyById,
    createBuy,
    updateBuy,
  } = require("../controllers/buy.controller");

  const router = Router();

  router.get("/", getBuy);


  router.get("/:id",
  [
    check("id","Esta factura no existe").isMongoId(),
    check("id").custom(BuyExistById),
    validateFields
  ],
   getBuyById);


  router.post("/",
  [
    validateJWT,
    check("fecha", "la fecha esta vacia").not().isEmpty(),
    check("user", "El usuario debe escribirse").not().isEmpty(),
    check("user").custom(userByIdExist),
    check("total", "el total esta vacio").not().isEmpty().isNumeric(),
    validateFields
  ],  
  createBuy);


  router.put("/:id",
  [
    validateJWT,
    check("id","Esta factura no existe").isMongoId(),
    check("id").custom(BuyExistById),
    check("fecha", "la fecha esta vacia").not().isEmpty(),
    check("user", "El usuario debe escribirse").not().isEmpty(),
    check("user").custom(userByIdExist),
    check("total", "el total esta vacio").not().isEmpty().isNumeric(),
    validateFields
  ], 
  updateBuy) ;



  module.exports = router;