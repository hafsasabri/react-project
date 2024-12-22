const Product = require('../models/products.model');

const getProductList = async () => {
    return await Product.find({});
}

module.exports = { getProductList }