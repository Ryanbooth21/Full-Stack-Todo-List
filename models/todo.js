const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    completed: {
        type: Boolean,
        default: false
    },
});

const Todo = mongoose.model('todos', TodoSchema)
module.exports = Todo