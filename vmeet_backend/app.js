const express = require('express');
const http = require('http');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
var xss = require("xss");
const mongoose = require('mongoose');

let server = http.createServer(app);

mongoose.connect(process.env.VMEET_DB_CONN_STRING,{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('Error connecting to muxdb' + err.stack);
});


app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    return res.send("connected!");
})
// require('./src/routes/api.js')(api);
// app.use('/api',api);
var auth = express.Router();
// auth.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// })
require('./src/routes/auth.js')(auth);
app.use('/auth',auth);
app.set('port',(process.env.PORT || 8000));


server.listen(app.get('port'),()=>{
    console.log('server listening on port ',app.get('port'));
})