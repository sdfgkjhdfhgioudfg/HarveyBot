const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'dog',
    description: 'Картинка собаки.',
    aliases: ['dog'],
    dm : false,

    async run(bot, message, args, footer) {
        fetch("https://api.thedogapi.com/v1/images/search").then(res => res.json()).then(data => {
            let embed = new Discord.RichEmbed()
                .setImage(data[0].url)
                .setColor(bot.config().color.SERVER)
            message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
        });
    }
}