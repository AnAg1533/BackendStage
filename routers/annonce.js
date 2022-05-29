const express = require('express')

const router  = express.Router();


const {create,annonceById,read,update,remove,list} = require('../controllers/annonce')


const {requireSignin,isAuth,isAdmin} = require('../controllers/auth')

router.get('/annonce/:annonceId',read);
router.get('/annonces',list)
router.post('/annonce/create',create);
router.delete('/annonce/:annonceId',remove)


router.param("annonceId",annonceById);

module.exports = router;