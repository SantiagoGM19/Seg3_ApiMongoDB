const express = require('express');
const router = express.Router();

const airbnbCtr = require("../controllers/airbnb.controller");

const vs = "/api/v1";

router.get(vs + "/airbnb/all-properties", airbnbCtr.consultarAirbnb);
router.get(vs + "/airbnb/types", airbnbCtr.consultarPropertyTypes);
router.get(vs + "/airbnb/reviews", airbnbCtr.consultarNumeroReviews);
router.get(vs + "/airbnb/beds/:nro_beds", airbnbCtr.consultarAirbnb);

module.exports = router;




