const express = require('express');
const http = require('http');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
var xss = require("xss");


let server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    return res.send("connected!");
})
app.set('port',(process.env.PORT || 8000));


server.listen(app.get('port'),()=>{
    console.log('server listening on port ',app.get('port'));
})