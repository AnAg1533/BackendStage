const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

const annonceSchema = new mongoose.Schema({
    

    employeur:
    {
        type:ObjectId,
        ref:'User'
    },
    domaine:
    {
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    nomCompagnie:
    {
        type:String,
        trim:true,
        required:true,
        maxlength:32    
    },
    salaire:
    {
        type:String,
        trim:true,
        required:true,
        maxlength:32    
    },
    emplacement:
    {
        type:String,
        trim:true,
        required:true,
    },
    description:
    {
        type:String,
        trim:true,
        required:true,
    }
    ,
    dateCreated:{
        type:Date,
        default:Date.now,
    }
})