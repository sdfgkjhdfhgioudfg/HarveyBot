const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'cat',
    description: 'Картинка кота.',
    aliases: ['cat'],
    dm : false,

    async run(bot, message, args, footer) {
        fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json()).then(data => {
            let embed = new Discord.RichEmbed()
                .setImage(data[0].url)
                .setColor(bot.config().color.SERVER)
            message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
        });
    }
}