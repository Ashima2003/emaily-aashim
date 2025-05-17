const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema); //users is the collection name in the database of userSchema
//mongoose doesn't overwrite. it only creates if it doesn't exist