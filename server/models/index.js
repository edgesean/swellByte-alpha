const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/swellByteDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err) return console.log(err);
  console.log('db connected to swellByteDb')
});


module.exports = mongoose;