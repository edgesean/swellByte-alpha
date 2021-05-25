const ApiData = require('../models/api');
const ApiMaresme = require('../models/apiMaresme');
const ApiNh = require('../models/apiNh');
const fetch = require("node-fetch");
const cron = require('node-cron');
const ApiFuerte = require('../models/apiFuerte');
require('dotenv').config();

cron.schedule('0 */8 * * *', async () => {
  loadApiMaresme();
  loadNhApi();
  sendApiData();
  loadFuerteApi();

  console.log('cron run api')
  
})


const getAllApi = async (req, res) => {
  const bcnData = await ApiData.findOne({}, null, {sort: {timeStamp: -1}});
  const msmeData = await ApiMaresme.findOne({}, null, {sort: {timeStamp: -1}});
  const hmptData = await ApiNh.findOne({}, null, {sort: {timeStamp: -1}});
  const fuerteData = await ApiFuerte.findOne({}, null, {sort: {timeStamp: -1}});
  const dataArr = [bcnData, msmeData, hmptData, fuerteData]

  //Post.find({}, null, {sort: {timeStamp: 1, _id: 2}}, function(err, docs) { ... });

  try {
    if (req) {
      res.send(dataArr);
    }
  } catch (error) {
    
  }
}


const getApiData = async (req, res) => {
  try {
    const waveData = await ApiData.findOne({}, null, {sort: {timeStamp: -1}});
    loadFuerteApi();
    if (req) res.send(waveData);
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

  // 608c483c6f94b60015023d6c
  // 608c483c6f94b60015023d6c

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
      const waveData = await ApiMaresme.findOne({}, null, {sort: {timeStamp: -1}})
      if (req) res.send(waveData.pop());
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
      const waveData = await ApiNh.findOne({}, null, {sort: {timeStamp: -1}})
      if (req) res.send(waveData.pop());
    } catch (error) {
      console.log(error);
    }
  }

  //-----
  const loadFuerteApi = async (req, res) => {
    const waveData = await apiFetch(28.6955, -14.0443)
    const apiDataObj = {
      swellData: waveData,
      timeStamp: Date.now()
      //28.6955, -14.0443
    }  
    try {
      await ApiFuerte.create(apiDataObj)
      if (req) {
        res.send('worked')
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }

  const getApiFuerte = async (req, res) => {
    try {
      const waveData = await ApiFuerte.findOne({}, null, {sort: {timeStamp: -1}})
      if (req) res.send(waveData.pop());
    } catch (error) {
      console.log(error);
    }
  }

  //-------





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

module.exports = {getApiData, sendApiData, loadApiMaresme, getApiMaresme, loadNhApi, getApiNh, getAllApi};
