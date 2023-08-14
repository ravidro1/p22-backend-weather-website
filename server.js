require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// log the path before every request for debug purpose
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

const weatherRoutes = require("./routes/weatherRoutes");

app.use("/weather", weatherRoutes);

app.listen(PORT, () => console.log("Listen To Port: ", PORT));
