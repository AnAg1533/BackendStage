const Annonce = require('../models/annonce')


const {errorHandler} = require('../helpers/dbErrorHandler')


exports.annonceById = (req,res,next,id) => 
{
    Annonce.findById(id).exec((err,annonce)=>{
        if(err || !annonce)
        {
            return res.statu(400).json({
                error:"annonce non trouvee"
            })
        }
        req.annonce = annonce;
        next();
    })
}


exports.create = (req,res) =>
{
    const annonce = new Annonce(req.body)
    annonce.save((err,data)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        res.json({data})
    })
}

exports.read = (req,res) =>
{
    return res.json(req.annonce)
}

exports.update = (req,res) =>
{
    const annonce = req.annonce;
    annonce.employeur = req.body.employeur;
    annonce.domaine = req.body.domaine;
    annonce.nomComagnie = req.body.nomComagnie;
    annonce.salaire = req.body.salaire;
    annonce.emplacement = req.body.emplacement;
    annonce.description = req.body.description;
    annonce.dateCreated = req.body.dateCreated;
}

exports.remove = (req,res) => 
{
    const annonce = req.annonce
    
    annonce.remove((err,data)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}


exports.list = (req,res)=>
{
    Annonce.find().exec((err,data)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }

        res.json(data)
    })
}