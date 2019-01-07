const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.post('/', authCheck, (req, res) => {
	console.log(req.body);
    res.send({success:true, user:req.user});
});

module.exports = router;