// dependencied
var express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

var app = express();


// //connect to database
// mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true })
//   .then(() => console.log('connection successful'))
//   .catch((err) => console.error(err));
// mongoose.Promise = global.Promise;

//middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'client/build')));

//basic-get
app.get('/check',function(req,res){
	//console.log('accessing homepage');
	res.send({success:true});
});
 
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
*/

var port = process.env.PORT || 3001;
var server = app.listen(port,function(){
	console.log('server listening....')
});