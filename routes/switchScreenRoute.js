const express = require('express');
const router = express.Router();

const {getAllSwitchScreens, getSwitchScreen, updateSwitchScreen, deleteSwitchScreen, insertSwitchScreen, insertSwitchScreens} = require('../controllers/switchScreenController');

router.post('/insertSwitchScreen', insertSwitchScreen);
router.post('/insertSwitchScreens', insertSwitchScreens);

router.get('/getAllSwitchScreens', getAllSwitchScreens);
router.get('/:id', getSwitchScreen);
router.put('/:id', updateSwitchScreen);
router.delete('/:id', deleteSwitchScreen);

module.exports = router;