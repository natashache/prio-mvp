var express = require('express');
var path=require('path');
var port=(process.env.PORT || 3000);
var bodyParser = require('body-parser');

var userController = require('./userController.js');

var uriString=process.env.MONGODB_URI||'mongodb://localhost/prio';
var mongoose = require('mongoose');
mongoose.connect(uriString);


var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',express.static(__dirname+'/../'));

app.post('/api/lists',userController.saveList);
app.get('/api/lists',userController.getList);


app.listen(port);

