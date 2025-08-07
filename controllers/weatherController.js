const axios = require("axios");

// Utility to format weather data
const formatWeatherData = (data) => ({
  city: data.location.name,
  country: data.location.country,
  degree: data.current.temp_c,
  precipitation: data.current.precip_mm,
  humidity: data.current.humidity,
  wind: data.current.wind_kph,
});

// GET /weather?city=London
const getWeatherByCity = async (req, res) => {
  try {
    const city = req.query.city;
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    res.status(200).json({ weather: formatWeatherData(data) });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Server error";
    res.status(status).json({ error: message });
  }
};

//#016d3c

// GET /autocomplete?inputValue=Lon
const autoComplete = async (req, res) => {
  try {
    const inputValue = req.query.inputValue;
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${inputValue}`
    );

    console.log(data);

    // Return an array of city suggestions
    const suggestions = data.map((loc) => loc.name);
    res.status(200).json({ suggestions });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Server error";
    res.status(status).json({ error: message });
  }
};

// GET /weather-coords?lat=12.97&lon=77.59
const getWeatherByLatitudeAndLong = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const query = `${lat},${lon}`;
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}&aqi=no`
    );

    res.status(200).json({ weather: formatWeatherData(data) });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || "Server error";
    res.status(status).json({ error: message });
  }
};

module.exports = {
  getWeatherByCity,
  autoComplete,
  getWeatherByLatitudeAndLong,
};
