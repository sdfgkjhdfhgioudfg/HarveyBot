const Discord = require('discord.js');
const request = require("request")

module.exports = {
    name: 'tickle',
    description: 'Пощекотать пользователя.',
    aliases: ['tickle'],
    use : '[@user]',
    dm : false,

    async run(bot, message, args, footer) {
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send(bot.config().emoji.loading + 'Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/tickle', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **пощекотал(а)** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(...footer) 
                        .setTimestamp(); 
                        msg.edit({embed
                    }).then(function(message) {
                        message.react("🤣")
                    }).catch(function() {});
                } catch (e) {
                    bot.utils().errorr(message, e)
                }
            })
        });
    }
}