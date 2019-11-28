const axios = require("axios");
const CACHE_LINK = process.env.CACHE;

function checkEventCache(cityName, dates) {
  const key = `${cityName}-${dates}`;
  console.log(key);
  const cachedEvent = axios.get(`${CACHE_LINK}${key}`);
  return cachedEvent.then(resp => resp.data);
}

function setEventCache(cityName, dates, events) {
  const key = `${cityName}-${dates}`;
  return axios.post(`${CACHE_LINK}${key}`, events);
}

function checkHotelCache(info) {
  const key = `${info.city}-${info.arrivalDate}-${info.departureDate}-${info.minPrice}-${info.maxPrice}`;
  console.log(key);
  const cachedEvent = axios.get(`${CACHE_LINK}${key}`);
  return cachedEvent.then(resp => resp.data);
}

function setHotelCache(info, hotels) {
  const key = `${info.city}-${info.arrivalDate}-${info.departureDate}-${info.minPrice}-${info.maxPrice}`;
  return axios.post(`${CACHE_LINK}${key}`, hotels);
}

module.exports = { checkEventCache, setEventCache, checkHotelCache, setHotelCache };
