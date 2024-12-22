const service = require('../services/products.service');

const getProducts = async (req, res) => {
    service.getProducts()
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = {
    getProducts
}