const express = require('express');

const router = express.Router();

const {create,candidatureById,read,remove,list} = require('../controllers/candidature');


router.get('/candidature/:candidatureId',read)

router.post('/candidature/create',create);

router.delete('/candidature/:candidatureId',candidatureById);

router.get('/candidatures',list);


module.exports = router;