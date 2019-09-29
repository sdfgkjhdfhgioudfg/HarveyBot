const Discord = require("discord.js");
const config = require("../config.js").CONFIG;
const emoji = config().emoji

//command: no permission
module.exports.noPerms = (message, perm) => {
    message.delete()
    let embed = new Discord.RichEmbed()
        .setTitle(emoji.cross + "| !ERROR!")
        .setDescription(perm)
        .setColor(config().color.ERROR);
    message.channel.send(embed).then(m => m.delete(30000))
}

//command: no reason
module.exports.noReason = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setTitle(emoji.cross + "| !ERROR!")
        .setDescription(perm)
        .setColor(config().color.ERROR);
    message.channel.send(embed).then(m => m.delete(30000))
}

//command: done
module.exports.done = (message, done) => {
    let embed = new Discord.RichEmbed()
        .setTitle(emoji.check + "| !SUCCESS!")
        .setDescription(done)
        .setColor(config().color.DONE);
    message.channel.send(embed).then(m => m.delete(30000))
}

module.exports.errorr = (message, err) => {
    let embed = new Discord.RichEmbed()
        .setTitle(emoji.cross + '| ' + err)
        .setColor(config().color.ERROR)
        .setImage("https://media1.tenor.com/images/41334cbe64331dad2e2dc6272334b47f/tenor.gif?itemid=8680016")
        .setTimestamp()
        .setFooter("❌ Error");
    message.channel.send({embed}).then(m => m.delete(30000))
}

module.exports.warn = (message, warn) => {
    let embed = new Discord.RichEmbed()
        .setTitle('⚠ | ' + warn)
        .setColor(config().color.WARNING)
    message.channel.send({embed}).then(m => m.delete(30000))
}