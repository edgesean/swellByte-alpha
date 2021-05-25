const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err) return console.log(err);
  console.log('db connected to swellByteDb')
});


module.exports = mongoose;

