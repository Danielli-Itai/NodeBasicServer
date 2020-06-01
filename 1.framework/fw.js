/***
 * Message constants
 */
const MSG_INTRO='Hello World'
const MSG_STARTED = 'Server started on Port'

/**
 * 
 * Formatted Messages
 */
exports.msgIntro = function(){
    MSG_INTRO
};
exports.msgSTarted = function (port){
    MSG_STARTED +' ' + port
};


//'"http://localhost:9080/api/v1/resources/output/myNespresso200000000.jpg"'
const HOST_NAME = '127.0.0.1';
const SERVICE_PORT=9080;
const SERVICE_PATH = '/api/v1';
exports.serviceAddress = function () {
    HOST_NAME + ':' + SERVICE_PORT + SERVICE_PATH
};



module.exports.logger = function(req,res,next){
    console.log('Logging ');
    next();
}
