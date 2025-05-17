const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));  //will have code this time 

    //did to verify cookie wala step
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); //this will send the user object to the client
        // res.send(req.session);
    });

    app.get(('/api/logout'), (req, res) => {
        //.logout() is a passport method that will remove the user id from the cookie
        req.logout();
        res.send(req.user); //this will send the user object to the client
    });
};
