const mongoose = require('mongoose')

const URIList = new mongoose.Schema({
  long_uri: String
});

const URIListModel = mongoose.model('URIList', URIList);

module.exports = URIListModel