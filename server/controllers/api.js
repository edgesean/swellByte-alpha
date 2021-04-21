const ApiData = require('../models/api');
const fetch = require("node-fetch");
const apiKey = process.env.APIKEY

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
const params = 'swellHeight,waveHeight';

  return  fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': apiKey
  }
}).then((response) => response.json()).then((jsonData) => {
  
  return jsonData;
});

}


module.exports = {getApiData, sendApiData};



// const lat = 41.3842;
// const lng = 2.2249;
// const params = 'swellHeight,waveHeight';

// fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
//   headers: {
//     'Authorization': '299e84fa-9aea-11eb-93e5-0242ac130002-299e86f8-9aea-11eb-93e5-0242ac130002'
//   }
// }).then((response) => response.json()).then((jsonData) => {
//   // Do something with response data.
//   console.log(jsonData)
// });
// //41.38421536425972, 2.224931201325092