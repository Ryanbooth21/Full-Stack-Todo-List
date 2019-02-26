const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/todolist')
mongoose.Promise = global.Promise;

app.use(express.static('public'))

app.use(bodyParser.json())

app.use('/api', require('./routes/api'))

app.use(function(err, req, res, next){
    console.log(err)
    res.status(422).send({error: err.message})
})

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests')
})