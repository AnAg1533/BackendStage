const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

var api = express.Router();


//middlewares


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 9090;

app.listen(port,()=>{
    console.log('Server live at port : ' + port);
})


//mongoose.connect(process.env.DATABASE,  {
//    useNewUrlParser:true,
//    useCreateIndex:true,
//    useUnifiedTopology:true
//}).then(()=>console.log('Connected to the database'));

//mongoose.set('useFindAndModify',false);
