const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user')

router.get('/todos', function(req, res, next){
    Todo.find({}).then(function(todos){
        res.send(todos);
    })
})

router.post('/users', function(req, res, next){
    User.create(req.body)
        .then(function(Users){
            res.send( Users )
    }).catch(next)
})

router.get('/users', function(req, res, next){
    User.find({}).then(function(user){
        res.send(user);
    })
})

router.post('/todos', function(req, res, next){
    Todo.create(req.body)
        .then(function(todo){
            res.send( todo )
    }).catch(next)
})

router.put('/todos/:id', function(req, res, next){
    Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Todo.findOne({_id: req.params.id}).then(function(todo){
            res.send(todo)
        })
    })
})

router.delete('/todos/:id', function(req, res, next){
    Todo.findByIdAndRemove({_id: req.params.id}).then(function(todo){
        res.send(todo)
    })
    res.send({type: 'DELETE'})
})

module.exports = router