const express = require("express");
const path = require("path");
const app = express();
const { loadHotels, loadCities } = require("./utils/Hotels/index.js");
const { getEvents } = require("./utils/Events/getEvents");
const { checkEventCache, setEventCache, checkHotelCache, setHotelCache } = require("./utils/cache/cache.js");

app.use("/api", express.json(), express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../build/")));

app.post("/api/city", async (req, res) => {
  try {
    const cityName = req.body[0];
    const cities = await loadCities(cityName);
    res.json(cities);
  } catch (e) {
    res.json([]);
  }
});

app.post("/api/hotels", async (req, res) => {
  try {
    const cityInfo = req.body;
    let hotels;
    const cachedHotels = await checkHotelCache(cityInfo);
    if (cachedHotels === "") {
      console.info("Pulling new Hotel Info");
      hotels = await loadHotels(cityInfo);
      console.log(hotels);
      setHotelCache(cityInfo, hotels);
    } else {
      hotels = JSON.parse(cachedHotels);
    }
    res.json(hotels);
  } catch (e) {
    res.json([]);
  }
});

app.post("/api/events", async (req, res) => {
  try {
    let events;
    const cachedEvents = await checkEventCache(req.body.city, req.body.date);
    if (cachedEvents === "") {
      console.info("Pulling new Event Info");
      events = await getEvents(req.body.city, req.body.date);
      setEventCache(req.body.city, req.body.date, events);
    } else {
      events = JSON.parse(cachedEvents);
    }
    res.json(events);
  } catch (e) {
    throw new Error("event error");
  }
});

module.exports = app;
