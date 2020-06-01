const https = require('https');

const fw= require('../1.framework/fw.js');



exports.srvInfo = function(req,res) {
    res.send('Hello World');
  };
  
https.get(fw.serviceAddress(), (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
 
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });
 
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    }
);