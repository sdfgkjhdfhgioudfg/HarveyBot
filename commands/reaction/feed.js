const Discord = require('discord.js');
const request = require("request")

module.exports = {
    name: 'feed',
    description: 'Дать покушать пользователю.',
    aliases: ['feed'],
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
            request('https://nekos.life/api/v2/img/feed', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} дал(а) покушать ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setThumbnail()
                        .setFooter(...footer);
                        msg.edit({embed
                    }).then(function(message) {
                        message.react("🍲")
                    }).catch(function() {});
                } catch (e) {
                    bot.utils().errorr(message, e)
                }
            })
        });
    }
}