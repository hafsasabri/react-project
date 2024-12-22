const data = require('../data/products.data');

const getProducts = async () => {
    return await data.getProductList();
}

module.exports = { getProducts }