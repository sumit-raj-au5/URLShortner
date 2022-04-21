const router = require('express').Router();
const {signin, signup, sendResetPasswordLink, resetPassword, userVerification, signOut} = require('../services/userAuth.services');

router.get('/signin', (req, res)=>{
    res.send('Make a post request on this endpoint with your mail and password to authenticate');
});
router.post('/signin', signin);


router.get('/signup', (req,res)=>{
    res.send("Make a POST request on this endpoint with your mail and password to create a user");
});
router.post('/signup', signup);

router.get('/verification/:string',userVerification);

router.get('/password-reset', (req,res)=>{
    res.send('Make a post request on this endpoint with your email to receive password reset link')
});
router.post('/password-reset', sendResetPasswordLink);

router.get('/password-reset/:urlString', (req,res)=>{
    res.send('Make a post request on this endpont with your email and new password to reset passowrd');
});
router.post('/password-reset/:urlString', resetPassword);

// router.get('/signout', signOut)

module.exports = router;