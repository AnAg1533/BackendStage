const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

var api = express.Router();

require('dotenv').config();
//middlewares


//routes

const annonceRoutes = require('./routers/annonce')


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use('/api',annonceRoutes);

const port = process.env.PORT || 9090;

app.listen(port,()=>{
    console.log('Server live at port : ' + port);
})


mongoose.connect(process.env.DATABASE,  {

}).then(()=>console.log('Connected to the database'));

