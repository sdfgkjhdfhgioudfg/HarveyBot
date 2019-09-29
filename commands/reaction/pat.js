const Discord = require('discord.js');
const request = require("request")

module.exports = {
    name: 'pat',
    description: 'Погладить пользователя по голове.',
    aliases: ['pat'],
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
            request('https://nekos.life/api/v2/img/pat', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **погладил(а) по голове** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(...footer) 
                        .setTimestamp();
                        msg.edit({embed
                    }).then(function(message) {
                        message.react("✋")
                    }).catch(function() {});
                } catch (e) {
                    bot.utils().errorr(message, e)
                }
            })
        });
    }
}