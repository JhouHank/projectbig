const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/', productsController.handleProducts);
router.put('/', productsController.handleEditProducts);
router.put('/onSale', productsController.handleOnSaleProducts);

module.exports = router;