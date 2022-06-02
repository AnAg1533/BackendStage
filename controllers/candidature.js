const formidable = require('formidable');


const Candidature = require('../models/Candidature')


const errorHandler = require('../helpers/dbErrorHandler');


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
    // let form = new formidable.IncomingForm()
    // form.keepExtentions = true
    // form.parse(req,(err,fields,files)=>{

    //     if(err)
    //     {
    //         return res.status(400).json({
    //             error:'resume could not be uploaded'
    //         })
    //     }

        const fields = req.body;



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
    //})
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

exports.list = (req,res) => 
{
    Candidature.find().exec((err,data)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(data)
    })
}
