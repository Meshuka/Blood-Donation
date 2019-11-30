var mongoose = require('mongoose');

const eventdetailSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('eventdetails', eventdetaisSchema)