const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

//Get a list of ninjas from the database
router.get('/todos', function(req, res, next){
    Todo.find({}).then(function(ninjas){
        res.send(ninjas);
    })
})

router.post('/todos', function(req, res, next){
    // This creates a new Ninja schema based on the parameters of our Ninja object
    Todo.create(req.body)
    // after the ninja is created, we send it back to the user.
        .then(function(ninja){
            res.send( ninja )
    }).catch(next)
})

router.put('/todos/:id', function(req, res, next){
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja)
        })
    })
})

router.delete('/todos/:id', function(req, res, next){
    Todo.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
    })
    res.send({type: 'DELETE'})
})

module.exports = router