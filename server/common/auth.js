const passport = require('passport');
const auth = {};

// login 안했을 때
auth.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}
// login 했을 때
auth.checkNotAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

module.exports = auth;