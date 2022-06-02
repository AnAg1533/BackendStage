const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema


const candidatureSchema = new mongoose.Schema({
    employerusername:{
        type:String,
        required:true,
        maxlength:100,
    },
    employeeusername:{
        type:String,
        required:true,
        maxlength:100
    },
    status:
    {
        type:String,
        required:true,
        maxlength:25
    },
    dateCreated:
    {
        type:Date,
        default:Date.now,
    }
},{timeStamps:true})

exports.Candidature = mongoose.model('Candidature',candidatureSchema)