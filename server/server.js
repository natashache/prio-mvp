var express = require('express');
var path=require('path');
var port=3000;
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/shortly');


var app=express();

app.use('/',express.static(__dirname+'/../'));
// app.get('/', function(req,res) {
//   res.sendFile(path.join(__dirname+'/../'+'index.html'));
// })

app.listen(port);

