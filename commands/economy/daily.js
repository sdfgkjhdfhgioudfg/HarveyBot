const Discord = require('discord.js');
const moment = require('moment')
const Profile = require('../../lib/database/model/profile')

module.exports = {
    name: 'daily',
    description: 'Ежедневный бонус.',
    aliases: ['daily'],
    dm : false,

    async run(bot, message, args, footer) {
        let dal = bot.random(100, 500)
        Profile.findOne({
            GuildID : message.guild.id,
            userID: message.author.id
        }, async (err, out) => {
            if(err) return bot.utils().errorr(message, err)
            if (out.daily != moment().format('L')) {
                out.daily = moment().format('L')
                if(!out){
                    let newCoin = new Profile({
                        GuildID : message.guild.id,
                        userID: message.author.id,
                        coin: out.coin,
                        daily: moment().format('L')
                    })
                    newCoin.save()
                } else {
                    out.coin = out.coin + dal
                    out.save()
                    let embed = new Discord.RichEmbed()
                        .setTitle(bot.config().emoji.check + ' DAILY')
                        .setColor(bot.config().color.SERVER)
                        .setDescription(`**${message.author.username}** | Ты получил **${dal}$**`)
                    message.channel.send(embed).then(m => m.delete(10000)).catch(e => bot.utils().errorr(message, e))
                }
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(bot.config().emoji.cross + ' DAILY')
                    .setColor(bot.config().color.ERROR)
                    .setDescription(`**${message.author.username}** | Ты уже получин свою награду, следующая **` + moment().endOf('day').fromNow() + '**')
                message.channel.send(embed).then(m => m.delete(10000)).catch(e => bot.utils().errorr(message, e))
            }
        })
    }
}