const Buoy = require('../models/buoy');
const puppeteer = require('puppeteer');
const cron = require('node-cron');

cron.schedule('1 * * * *', async () => {
  sendBuoyData();
  console.log('cron run')
  
})


const getBuoyData = async (req, res) => {
  try {
    const waves = await Buoy.find();
    if (Date.parse(waves[waves.length-1].timeStamp)-Date.now() > 3600000) {
     await sendBuoyData();
    }
    res.send(waves[waves.length-1]);
  } catch (error) {
    console.log(error)
  }
}

const sendBuoyData = async (req, res) => {
  let siteUrl = 'https://portus.puertos.es/index.html#/dataTablesRTWidget?stationCode=1731&variables=WAVE&isRadar=false&latId=&lonId=&locale=en';
  const browser = await puppeteer.launch({headless:true, args: [ '--ignore-certificate-errors' ]});
  let page = await browser.newPage();
  await page.goto(siteUrl, {waitUntil: 'networkidle2'});
  
  let data = await page.evaluate(async () => {
    let dataTable = await document.querySelector('#__BVID__8__BV_tab_container_').innerText;
    return dataTable;
  })

  let singleHour = data.split(' ').slice(20, 21).join('').split('\t')
  // Cabo begur a different table schema than barcelona buoy 

  const waveObj = {
    height: singleHour[2],
    period: singleHour[3],
    direction: singleHour[4],
    timeStamp: Date.now()
  }

  
  // res.send(waveObj)
  try {
    await Buoy.create(waveObj);
  } catch (error) {
    console.log(error);
  }
  console.log('cron success')
  browser.close();

}


module.exports = {getBuoyData, sendBuoyData};