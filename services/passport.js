const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //importing the user model
//this user is the one we created in the models folder
passport.serializeUser((user,done) => {
    done(null, user.id); //null means no error and user.id is the id of the user we found and this user.id is thr id assigned by mongoDB and not google 
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user); //null means no error and user is the user we found
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    //findOne very first id that match the criteria
    User.findOne({googleId: profile.id}).then((existingUser) => {
        if(existingUser){
            //we already have a record with the given profile ID
            done(null, existingUser); //null means no error and existingUser is the user we found
        } else {
            new User({googleId: profile.id}).save()
            .then((user) => {
                done(null, user); //null means no error and user is the new user we created
            });
        }
    })
}));