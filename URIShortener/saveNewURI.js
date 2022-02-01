const URIListModel = require("./models/URIList.model");
const dns = require('dns')
const dns_promises  = dns.promises


const saveNewURI = async (uri)=>{
  if (! (/^https*:\/\//i.test(uri))){
    throw new Error('Invalid URL')
  }
  const cleanURI = new URL(uri).hostname
  await dns_promises.lookup(cleanURI)

  const existantURI = await URIListModel.findOne({long_uri:uri})
  if(!!existantURI)
    return existantURI

  const URIDoc = await URIListModel.create({
    long_uri:uri
  })
  return URIDoc
}

module.exports = saveNewURI