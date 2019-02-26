const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema

const TodoSchema = new Schema({
    name: {
        type: String,
        // The second parameter of required below returns the message below
        required: [true, "Name field is required"]
    },
    completed: {
        type: Boolean,
        default: false
    },
});

//the ninja schema will represent the ninja model
//we me use this to create a collection in our database
// The ninja model = ninja collection
const Todo = mongoose.model('todos', TodoSchema)
module.exports = Todo