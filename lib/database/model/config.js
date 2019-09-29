const mongoose = require('mongoose');
const config = mongoose.Schema({
    GID : String,
    PIS : String
});

module.exports = mongoose.model("Config", config)