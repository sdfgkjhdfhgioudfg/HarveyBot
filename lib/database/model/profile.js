const mongoose = require('mongoose');
const profile = mongoose.Schema({
	username : String,
    GuildID : String,
    SV_name : String,
    userID: String,
    daily: String,
    rep : Number,
    timeRep : String,
    coin: Number,
    warn: Number,
    lvl: Number,
    xp: Number,
    numBG : String
});

module.exports = mongoose.model("Profile", profile)