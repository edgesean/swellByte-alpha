const ApiData = require('../models/api');
const ApiMaresme = require('../models/apiMaresme');
const ApiNh = require('../models/apiNh');
const fetch = require("node-fetch");
const cron = require('node-cron');
require('dotenv').config();

cron.schedule('0 */4 * * *', async () => {
  loadApiMaresme();
  loadNhApi();
  sendApiData();

  console.log('cron run api')
  
})

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
    if (req) {
     res.send('worked') 
    }
    
    
  } catch (error) {
    console.log(error);
  }
}

  const loadApiMaresme = async (req, res) => {
    const waveData = await apiFetch(41.4932, 2.4014)

    const apiDataObj = {
      swellData: waveData,
      timeStamp: Date.now()
    }
  
    try {
      await ApiMaresme.create(apiDataObj)
      if (req) {
       res.send('worked') 
      }
      
      
    } catch (error) {
      console.log(error);
    }

  }

  const getApiMaresme = async (req, res) => {
    try {
      const waveData = await ApiMaresme.find();
      res.send(waveData);
    } catch (error) {
      console.log(error);
    }
  }

  const loadNhApi = async (req, res) => {
    const waveData = await apiFetch(42.9110, -70.6022)
    const apiDataObj = {
      swellData: waveData,
      timeStamp: Date.now()
    }  
    try {
      await ApiNh.create(apiDataObj)
      if (req) {
        res.send('worked')
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }

  const getApiNh = async (req, res) => {
    try {
      const waveData = await ApiNh.find();
      res.send(waveData);
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

module.exports = {getApiData, sendApiData, loadApiMaresme, getApiMaresme, loadNhApi, getApiNh};
