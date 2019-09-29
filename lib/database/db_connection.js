var db = require('./db.js');
var config = require('../../config.js').CONFIG

db.connect(config().ConnectDB, function(err){
    if(err) {
        return console.log('[DB] > ' + err)
    } else {
        require('../../xds.js')
    }
})