const express = require('express')

const router = express.Router();


const {signUp,signIn,signOut,requireSignin} = require('../controllers/auth')

const {userSiguvalidator}  = require('../validator')


router.post("/signup",userSigupvalidator,signUp);
router.post("/signin",signIn);
router.get("/signout",signOut);

module.exports = router;
