
const HOST_NAME = '127.0.0.1';
const PORT=3001;





/*****************************************\
*      Creating new server instance       *
\*****************************************/
var http = require('http');
var fw = require('../1.framework/fw.js');
const server = http.createServer(function (req, res){      //  Create server and callback function.
    res.statusCode=200;                             //  Ok response.
    res.setHeader('Content-type','text/plain');    //  Define the replay type.
    res.end(fw.MESSAGE);                          //  Define the replay contents.
});





/*****************************************\
*              Middle-wear                *
\*****************************************/

//  Initialize the express application.
var express = require('express');
var app = express();
app.use(fw.logger);
app.listen(PORT, function(){
    console.log(fw.msgSTarted(PORT));
});

//  Message body parser for exchanging parameters with the client.
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//  Location of static resources like CSS
var path = require('path');





/*****************************************\
*         Application Views               *
\*****************************************/
//  Set views root path.
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname,'views'))
app.set('views', path.join(__dirname,'../4.views'));
app.use(express.static(path.join(__dirname, '../4.views/js')));

//  render index view.
app.get('/', function(req,res){
    var serv_title = 'Test app';  //  Server variable declaration.
    res.render('index',{title:serv_title});    // Embedding the values in the client document.
});





/*****************************************\
*               Execution Flow            *
\*****************************************/
exec_flow=require('../4.views/exec.js');
app.get('/exec', function(req,res){
    exec_flow.get(req,res);    // Embedding the values in the client document.
});





/*****************************************\
*               Users list                *
\*****************************************/
//  Add data validation.
var validator = require('express-validator');
app.use(validator());
//  Set global variables
app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});

var users_view = require('../4.views/users.js');

//  http://localhost:3001/users
app.get('/users', function(req,res){
    users_view.get(req,res);
});
app.post('/users/add', function(req,res){
    users_view.add_post(req,res);
});
app.delete('/users/delete/:id', function(req,res){
    users_view.delete(req,res);
});



//  http://localhost:3001/users/add
var users_db_view = require('../4.views/usersDb.js');
app.get('/users/db', function(req,res){
    users_db_view.get(req,res);
});
app.post('/users/db/add', function(req,res){
    users_db_view.add_post(req,res);
});




/*****************************************\
*           Handle files view             *
\*****************************************/
//  http://localhost:3001/files
var files_view = require('../4.views/files.js');
app.get('/files', function(req,res){
    files_view.get(req,res);
});
    
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.post('/files/add', function(req, res) {
    files_view.add_post(req,res);
});

app.delete('/files/delete/:id', function(req,res){
    files_view.delete(req,res);
});

app.get('/files/download/:id', function(req,res){
    files_view.download(req,res);
});

//const my_server = require('../3.servlets/server.js')
