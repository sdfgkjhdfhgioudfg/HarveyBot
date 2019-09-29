const Discord = require('discord.js')

module.exports = {
    systemAFK : (message, bot) => {
        if (message.content.includes(message.mentions.users.first())) {
            bot.afk.forEach(key => {
                if (key.id == message.mentions.users.first().id) {
                    message.guild.fetchMember(key.id).then(member => {
                        let username = member.user.username;
                        let embed = new Discord.RichEmbed()
                            .setTitle(`**${username}** сейчас в AFK по причине: ${key.reason}`)
                            .setColor('#ffd500')
                        message.channel.send(embed);
                    });
                }
            });
        } else {
            bot.afk.forEach(key => {
                if (message.author.id == key.id) {
                    bot.afk.delete(message.author.id);
                    let embed = new Discord.RichEmbed()
                        .setTitle(`${message.author.username} только-что пришел!`)
                        .setColor('#ffd500')
                    message.channel.send(embed);
                }
            });
        }
    }
}