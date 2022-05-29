const User = require('../models/user')
const jwt  = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const {errorHandler}  = require('../helpers/dbErrorHandler');
const req = require('express/lib/request');



exports.signUp = (req,res)=>
{
    console.log(req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err)
        {
            console.log('There is an error')
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({ user })
    })
}


exports.signIn = (req,res) => 
{
    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{
        if(err||!user)
        {
            return res.status(400).json({
                error:'User with email does not exist'
            })

            //if user is foynd make sure that email and password match

            if(!user.authenticate(password))
            {
                return res.status(401).json({
                    error:"Email and password dont match"
                })
            }

            //generate a signed token with the user id and secret

            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
            res.cookie('t',token,{expire:new Date()+9999})

            const {_id,name,lastname,email,telephone,role,resume} = user
            return res.json({token,user:{_id,name,lastname,email,telephone,role,resume}})
        }
    })
}



exports.signOut = (req,res) => {
    res.clearCookie('t')
    res.json({message:'you have logged out succefully'})
}






exports.isAuth = (req,res,next) => {
    let user = req.profile &&req.auth && req.profile._id == req.auth._id
    if(!user)
    {
        return res.status(403).json({
            error:"access denied"
        })
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0)
    {
        return res.status(403).json({
            error:'Access denied admin space'
        })
    }
    next()
}