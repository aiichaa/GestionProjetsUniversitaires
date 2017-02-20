/**
 * Created by InFo on 12/12/2016.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');

//routes
var compteRoutes = require('./app/routes/compte')(router);
var projetRoutes = require('./app/routes/projet')(router);
var documentRoutes = require('./app/routes/document')(router);
var rendezvousRoutes = require('./app/routes/rendezvous')(router);
var rendezvousnotificationRoutes = require('./app/routes/rendezvousnotification')(router);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//use api before routes
app.use('/api',compteRoutes);
app.use('/api',projetRoutes);
app.use('/api',documentRoutes);
app.use('/api',rendezvousRoutes);
app.use('/api',rendezvousnotificationRoutes);

//connect to database mongo
mongoose.connect('mongodb://localhost:27017/gestionprojetsuniversitaires',function(err){
    if(err){
        console.log('Not Connected to the database :'+ err);
    }else{
        console.log('Successfully Connected to MongoDB');
    }
});

//redirect to index
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function () {
    console.log('Running the server on port :' + port);
});