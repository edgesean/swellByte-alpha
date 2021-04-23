const ApiData = require('../models/api');
const fetch = require("node-fetch");
require('dotenv').config();

const getApiData = async (req, res) => {
  try {
    const waveData = await ApiData.find();
    res.send(waveData);
  } catch (error) {
    console.log(error);
  }
}

const sendApiData = async (req, res) => {
  const waveData = await apiFetch(41.3842, 2.2249)

  console.log(typeof waveData)
  const apiDataObj = {
    swellData: waveData,
    timeStamp: Date.now()
  }

  try {
    await ApiData.create(apiDataObj)
    res.send('worked')
    
  } catch (error) {
    console.log(error);
  }
}

const apiFetch = async (lat, lng) => {
const params = 'swellHeight,swellPeriod,swellDirection,waveHeight,windSpeed,windDirection';

  return  fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': process.env.APIKEY
  }
}).then((response) => response.json()).then((jsonData) => {
  return jsonData;
});

}

module.exports = {getApiData, sendApiData};
