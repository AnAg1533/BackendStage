const express = require('express')


const router = express.Router();


const {userById,read,update}  = require('../controllers/user')

const {SignUp} = require('../controllers/auth')

router.get('/user/:userId',read);

router.put('/user/:userId',update)


module.exports = router;