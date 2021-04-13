const express = require('express');
const router = express.Router();

const {getAllSwitchScreens, getSwitchScreen, updateSwitchScreen, deleteSwitchScreen, insertSwitchScreen, insertSwitchScreens} = require('../controllers/switchScreenController');
const { validateUpdate, validateSwitchScreen } = require('../middlewares/validation');

router.post('/insertSwitchScreen', insertSwitchScreen);
router.post('/insertSwitchScreens', insertSwitchScreens);

router.get('/getAllSwitchScreens', getAllSwitchScreens);
router.get('/:id', validateSwitchScreen, getSwitchScreen);
router.put('/:id', validateSwitchScreen, validateUpdate, updateSwitchScreen);
router.delete('/:id', validateSwitchScreen, deleteSwitchScreen);

module.exports = router;