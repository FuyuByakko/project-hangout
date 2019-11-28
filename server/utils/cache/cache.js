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

module.exports = { checkEventCache, setEventCache };
