const URIListModel = require("./models/URIList.model");
const dns = require('dns')


const saveNewURI = async (uri)=>{
  const cleanURI = uri.replace(/^https?:\/\//gi,'')
  await dns.promises.lookup(cleanURI, {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  })

  const existantURI = await URIListModel.findOne({long_uri:uri})
  if(!!existantURI)
    return existantURI

  const URIDoc = await URIListModel.create({
    long_uri:uri
  })
  return URIDoc
}

module.exports = saveNewURI