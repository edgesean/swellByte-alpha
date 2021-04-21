const mongoose = require('./index');


const buoySchema = mongoose.Schema({
  height: {
    type: String,
  },
  period: {
    type: String,
  },
  direction: {
    type: String
  },
  timeStamp: {
    type: Date
  }
})

const Buoy = mongoose.model("buoy", buoySchema)
module.exports = Buoy