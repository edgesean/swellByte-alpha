
const mongoose = require('./index');


const apiSchema = mongoose.Schema({
  swellData: {
    hours: [
      {
        swellDirection: {
          dwd: Number,
          icon: Number,
          meteo: Number,
          noaa: Number,
          sg: Number
        },
        swellHeight: {
          dwd: Number,
          icon: Number,
          meteo: Number,
          noaa: Number,
          sg: Number
        },
        swellPeriod: {
          dwd: Number,
          icon: Number,
          meteo: Number,
          noaa: Number,
          sg: Number
        },
        time: Date,
        waveHeight: {
          dwd: Number,
          icon: Number,
          meteo: Number,
          noaa: Number,
          sg: Number
        },
        windDirection: {
          icon: Number,
          noaa: Number,
          sg: Number
        },
        windSpeed: {
          icon: Number,
          noaa: Number,
          sg: Number
        }
      }
    ]
  },
  timeStamp: {
    type: Date
  }
})

const ApiMaresme = mongoose.model("apiMaresme", apiSchema)
module.exports = ApiMaresme


