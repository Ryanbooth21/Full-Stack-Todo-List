const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        // The second parameter of required below returns the message below
        required: [true, "UserName field is required"]
    },
    password: {
        type: String,
        // The second parameter of required below returns the message below
        required: [true, "Password field is required"]
    }
});

//the ninja schema will represent the ninja model
//we me use this to create a collection in our database
// The ninja model = ninja collection
const User = mongoose.model('users', userSchema)
module.exports = User