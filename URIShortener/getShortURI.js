const URIListModel = require("./models/URIList.model");

const getShortURI = async (id)=>{
  return URIListModel.findById(id)
}

module.exports = getShortURI