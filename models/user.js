const mongoose = require('mongoose');

const crypto = require('crypto');


const {v4:uuidv4} = require('uuid');
const { stringify } = require('querystring');


const userSchema = new mongoose.Schema({


    name:
    {
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    lastname:
    {
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        unique:32
    },
    telephone:
    {
        type:String,
        maxlength:15,
        required:true,
    },
    role:
    {
        type:Number,
        default:0
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    resume:{
        data:Buffer,
        contentType:String,
        required:false
    }

},{timeStamps:true})


userSchema.virtual('password')
.set(function(password)
{
    this._password=password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password)
})
.get(function()
{
    return this.password;
})


userSchema.methods = 
{
    authenticate : function(plainText)
    {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword:function(password)
    {
        if(!password)
            return ''

        try
        {
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(exception)
        {
            return exception;
        }
    }
}


module.exports = mongoose.model("User",userSchema);