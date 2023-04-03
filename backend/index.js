const connectToMongo= require('./db');
const express = require('express')
  //  MAIN FILE
connectToMongo();

var cors=require('cors');
const app = express()
const port = 5000
 
app.use(cors())
// to use reqeust.body we use this middleware which deal with json
 app.use(express.json());

  // we can put routings here to redirect to particular page
  //Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`vNotebook backend listening on port http://localhost:${port}`)
})