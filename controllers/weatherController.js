const axios = require("axios");

// [city]
exports.getWeatherByCity = async (req, res) => {
  try {
    // get the city from req
    const city = req.query.city;

    // fetch data from api
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`
    );

    // organized the data
    const OrganizedData = {};
    OrganizedData.city = data.location.name;
    OrganizedData.country = data.location.country;
    OrganizedData.degree = data.current.temp_c;
    OrganizedData.precipitation = data.current.precip_mm;
    OrganizedData.humidity = data.current.humidity;
    OrganizedData.wind = data.current.wind_kph;

    // send the organized data to the frontend
    res.status(200).json({ OrganizedData });
  } catch (error) {
    if (error && error.response) {
      const status = error.response.status;
      const message = error.response.message;
      res.status(status).json({ error: message });
      return;
    }
    res.status(500).json({ error });
  }
};
