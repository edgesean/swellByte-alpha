
const mongoose = require('./index');


const apiSchema = mongoose.Schema({
  swellData: {
    hours: [
      {
        swellHeight: {
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
        }
      }
    ]
  },
  timeStamp: {
    type: Date
  }
})

const Api = mongoose.model("api", apiSchema)
module.exports = Api


