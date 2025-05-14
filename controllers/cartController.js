const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const product = new Product(request.body.name, request.body.description, request.body.price);

  await product.save()
    .then(() => Cart.add(request.body.name))
    .then(() => {
      response.status(STATUS_CODE.FOUND).redirect("/products/new");
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error.message);
      response.status(500).send(error.message);
    });
  Cart.add(request.body.name);

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = () => {
  return Cart.getProductsQuantity();
};
