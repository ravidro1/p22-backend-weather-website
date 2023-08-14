const express = require("express");
const router = express.Router();

const { getWeatherByCity } = require("../controllers/weatherController");

router.get("/getWeatherByCity", getWeatherByCity);

module.exports = router;
