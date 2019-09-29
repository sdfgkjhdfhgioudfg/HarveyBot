var MongoClient = require('mongoose')
exports.connect = function(url, done) {
    MongoClient.connect(url, function(err) {
        if(err){
            console.log('[DB] > ' + err)
        } else {
            done();
        }
    })
}

exports.no_connect = function(url, callback){
	MongoClient.connect(url, function(err) {
        if(err){
            callback(true, err);
        } else {
            callback(false)
        }
    })
}