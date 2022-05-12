const formidable = require('formidable');

const _ = required('lodash');

const Candidature = require('../models/Candidature')


const errorHandler = require('../helpers/dbErrorHandler');

const {EPROTONOSUPPORT} = require('constants')



exports.candidatureById = (req,res,next,id) => 
{
    Candidature.findById(id)
    .populate("category")
    .exec((err,candidature)=>
    {
        if(err||!candidature)
        {
            res.status(400).json({
                error:"Product not found"
            })
        }
        req.candidature = candidature;
        next();
    })
}



exports.read = (req,res) => 
{
    return res.json(req.candidature)
}


exports.create = (req,res) => 
{
    let form = new formidable.IncomingForm()
    form.keepExtentions = true
    form.parse(req,(err,fields,files)=>{

        if(err)
        {
            return res.status(400).json({
                error:'resume could not be uploaded'
            })
        }

        const {employeruseraname,employeeusername,status,datecreated} = fields

        if(!employeeusername || !employeeusername || !status || !datecreated)
        {
            return res.status(400).json({
                error:"ALL FIELDS ARE REQUIRED"
            })
        }


        let candidature = new Candidature(fields)


        candidature.save((err,result)=>{

            if(err)
            {
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }

            res.json(result);
        })
    })
}



exports.remove = (req,res) => 
{
    let product = req.product
    product.remove((err,deletedCandidature)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }


        res.json({
            deletedCandidature,
            "message":"candidature deleted succesfully"
        })
    })
}


exports.update = (req,res) =>
{

}