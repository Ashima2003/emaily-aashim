const express = require('express');
const  mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //importing cookie-session
const passport = require('passport');
const keys = require('./config/keys'); //importing keys from config folder
require('./models/User');//we need to require javascript files to make sure they get included
require('./services/passport'); //not taking anything from it, hence reduced to require statement

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("MONGO_URI-2:", process.env.MONGO_URI.trim());
mongoose.connect(keys.mongoURI.trim());

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in milliseconds
        keys: [keys.cookieKey] //it allows us to give array of keys and it will pick anyOne for encryption for more security
    })
);
app.use(passport.initialize());
app.use(passport.session()); //this will use the cookie session to store the user id in the cookie

require('./routes/authRoutes')(app); 

 
const PORT = process.env.PORT || 5000; // Use the environment variable PORT or default to 5000 if herkou has specified
app.listen(PORT);