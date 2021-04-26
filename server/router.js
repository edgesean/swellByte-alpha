const router = require('express').Router();
const buoy = require('./controllers/buoy');
const api = require('./controllers/api');

router.get('/buoy', buoy.getBuoyData);
router.get('/load', buoy.sendBuoyData);
router.get('/loadApi', api.sendApiData);
router.get('/getApiData', api.getApiData);
router.get('/loadMaresme', api.loadApiMaresme);
router.get('/getApiMaresme', api.getApiMaresme);
router.get('/loadNh', api.loadNhApi);
router.get('/getNh', api.getApiNh)




module.exports = router;

