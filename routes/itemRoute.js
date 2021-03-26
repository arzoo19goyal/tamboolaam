const express = require('express');
const router = express.Router();

const {getAllItems} = require('../controllers/itemController');

router.get('/getAllItems', getAllItems);

module.exports = router;