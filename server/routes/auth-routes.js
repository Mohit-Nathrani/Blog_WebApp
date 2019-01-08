const router = require('express').Router();
const passport = require('passport');

// login
router.get('/login', (req, res) => {
    res.send({name:true});
});

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
});

// auth with google+
router.get('/google',passport.authenticate('google', {
    scope: ['profile', "email"]
}));


//  passport.authenticate('google', {
//     scope: ['profile']
// }));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('http://localhost:3000');
});

module.exports = router;