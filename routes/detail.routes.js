const {
  Router
} = require("express");
const {
  check
} = require("express-validator");

const {
  validateFields,
  validateJWT,
} = require("../middleware");

const {
  productExistById,
  DetailExistById,
  BuyExistById,
} = require("../helpers/db-validators");

const {
  getDetail,
  getDetailById,
  createDetail,
  updateDetail,
} = require("../controllers/Detail.controller");


const router = Router();

router.get("/", getDetail);


router.get("/:id",
  [
    check("id", "this id does not exist").isMongoId(),
    check("id").custom(DetailExistById),
    validateFields
  ],
  getDetailById);


router.post("/",
  [
    validateJWT,
    check("buy", "Buy dont can be empty").not().isEmpty(),
    check("buy", "This is not mongoId").isMongoId(),
    check("buy").custom(BuyExistById),
    check("quantity", "the quantity dont can be empty").not().isEmpty().isNumeric(),
    check("product", "product dont can be empty").not().isEmpty(),
    check("product", "This is not mongoId").isMongoId(),
    check("product").custom(productExistById),
    validateFields
  ],
  createDetail);


router.put("/:id",
  [
    validateJWT,
    check("id", "this detail doesnt exist").isMongoId(),
    check("id").custom(DetailExistById),
    check("buy", "Buy dont can be empty").not().isEmpty(),
    check("buy", "This is not mongoId").isMongoId(),
    check("buy").custom(BuyExistById),
    check("quantity", "the quantity dont can be empty").not().isEmpty().isNumeric(),
    check("product", "product dont can be empty").not().isEmpty(),
    check("product", "This is not mongoId").isMongoId(),
    check("product").custom(productExistById),
    validateFields
  ],
  updateDetail);


module.exports = router;