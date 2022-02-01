require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saveNewURI = require('./URIShortener/saveNewURI');
const getShortURI = require('./URIShortener/getShortURI');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',async (req,res)=>{
  try {
    const {url} = req.body
    const data = await saveNewURI(url)
    res.send({original_url:data.long_uri,short_url:data._id})
    
  } catch (error) {
    res.send({error: 'invalid url'})
  }
})

app.get('/api/shorturl/:id', async(req,res)=>{
  const uri = await getShortURI(req.params.id)
  if(!!uri)
    res.redirect(uri.long_uri)
  else
  res.send({ error: 'invalid url' })
})

const connectMongo = async()=> {
  await mongoose.connect(process.env.MONGOURI)
  console.log("connected to mongoDB")
}



connectMongo().catch(err => console.log(err))
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
