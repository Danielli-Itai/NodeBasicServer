var waterfall = require('async-waterfall');
//waterfall(tasks, callback);


var title = 'Exc path';  //  Server variable declaration.
var exec_path = [];


function exec_fileRead(req,res)
{
  const fs = require('fs')
  fs.readFile('file.md', 'utf-8', function (err, content) {
    if (err) {
      console.log(err)
      exec_path.push(err);
    }else{
      console.log(content)
      exec_path.push(content);
    }
  })
  //Content is not available at this point.
}


function exec_waterFall(req,res)
{
  waterfall([
    function(callback){
      exec_path.push('Waterfall Start');
      callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
      exec_path.push(arg1);
      exec_path.push(arg2);
      callback(null, 'three');
    },
    function(arg1, callback){
      exec_path.push(arg1);
      // arg1 now equals 'three'
      callback(null, 'done');
    }
  ], function (err, result) {
    // result now equals 'done'
    exec_path.push('Waterfall ' + result);
    res.render('exec',{title:title, exec_path:exec_path});    // Embedding the values in the client document.    
  });
}


async = require("async");
function exec_auto(req,res)
{
  exec_path.push('Auto start');
  async.auto({
    initialTask: function(callback) {
        //Do some operations
        exec_path.push('initialTask');
        callback(null, 'Initialized');
    },
    task1: ['initialTask', function(results, callback ) {
        //Add some more data to models
        exec_path.push('task1');
        callback(null, 'task1');
    }],
    task2: ['initialTask', function(results, callback ) {
        //Add some more data to models
        exec_path.push('task2');
        callback(null, 'task2');
    }],
    finalTask: ['task2', 'task1', function(results, callback ) {
        //Here the followings are the same: results.initialTask[1], results.task1[0], results.task2[0], results.task3[0]
        exec_path.push('Final Task');
        console.log("final task");
        callback(null, 'finalTask');
    }]
  }, function(err, results) {
    exec_path.push('Default/Error function');
    console.log('err = ', err);
    console.log('email_link = ', results.email_link);
  });
  exec_path.push('Auto end');
}


function exec_Inject(req,res)
{
  exec_path.push('Inject start');
  //  The example from `auto` can be rewritten as follows:
  async.autoInject({
    get_data: function(callback) {
        // async code to get some data
        exec_path.push('get data');
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        exec_path.push('make folder');
        callback(null, 'folder');
    },
    write_file: function(get_data, make_folder, callback) {
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        exec_path.push('write file');
        callback(null, 'filename');
    },
    email_link: function(write_file, callback) {
        exec_path.push('email');
        // once the file is written let's email a link to it...
        // write_file contains the filename returned by write_file.
        callback(null, {'file':write_file, 'email':'user@example.com'});
    }
  }, function(err, results) {
    exec_path.push('result');
    console.log('err = ', err);
    console.log('email_link = ', results.email_link);
  });
  exec_path.push('Inject end');
}


module.exports.get = function(req,res){
  var title = 'Exc path';  //  Server variable declaration.
  exec_path = [];

  setTimeout(function(){
    console.log('Tmeout callback');
    exec_path.push('Tmeout callback')
  },0);

//  exec_fileRead(req,res);

  exec_waterFall(req,res);

  exec_auto(req,res);

  exec_Inject(req,res);
  //res.render('exec',{title:title, exec_path:exec_path});    // Embedding the values in the client document.
}

