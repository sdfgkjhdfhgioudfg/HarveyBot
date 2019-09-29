const Discord = require('discord.js');
const request = require("request")

module.exports = {
    name: 'nneko',
    description: 'Контент 18+',
    aliases: ['nneko'],
    dm : false,

    async run(bot, message, args, footer) {
        if (!message.channel.nsfw) return bot.utils().noReason(message, `**${message.author.username}** | Контент 18+ можно использовать только в **NSFW** каналах.`)
        message.channel.send(bot.config().emoji.loading + 'Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/nsfw_neko_gif', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setImage(arr['url'])
                        .setColor(bot.config().color.SERVER)
                        .setFooter(...footer);
                    msg.edit({embed});
                } catch (e) {
                    bot.utils().errorr(message, e)
                }
            })
        });
    }
}