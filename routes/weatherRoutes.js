const express = require("express");
const router = express.Router();

const {
  getWeatherByCity,
  autoComplete,
  getWeatherByLatitudeAndLong,
} = require("../controllers/weatherController");

router.get("/getWeatherByCity", getWeatherByCity);
router.get("/autoComplete", autoComplete);
router.get("/getWeatherByLatitudeAndLong", getWeatherByLatitudeAndLong);

module.exports = router;
