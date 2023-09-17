const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/', memberController.handleMember);
router.put('/', memberController.handleEditMember);
router.delete('/', memberController.handleDeleteMember);

module.exports = router;