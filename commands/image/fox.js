const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'fox',
    description: 'Картинка лисы.',
    aliases: ['fox'],
    dm : false,

    async run(bot, message, args, footer) {
        fetch("https://randomfox.ca/floof/").then(res => res.json()).then(data => {
            let embed = new Discord.RichEmbed()
                .setImage(data.image)
                .setColor(bot.config().color.SERVER)
            message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
        });
    }
}

module.exports.help = {
    name: '',
    aliases: [],

    type : 'image',
    args : ['none'],
    desc : ''
};