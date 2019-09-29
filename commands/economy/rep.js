const Discord = require('discord.js');
const moment = require('moment')
const Profile = require('../../lib/database/model/profile')

module.exports = {
    name: 'rep',
    description: 'Дать репутацию пользователю.',
    aliases: ['rep'],
    use : '<@user>',
    dm : false,

    async run(bot, message, args, footer) {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author

        if(argsUser.id == message.author.id) return bot.utils().noReason(message, `${argsUser} | Нельзя дать репутацию самому себе!`)

        Profile.findOne({
            GuildID : message.guild.id,
            userID: argsUser.id
        }, (err, out) => {
            if(err) return bot.utils().errorr(message, err)
            if(!out) return bot.utils().noReason(message, `${argsUser} | Не зарегистрирован в **\`базе данных\`**!`)
            if (out.timeRep != moment().format('L')) {
                out.timeRep = moment().format('L')
                if(!out){
                    let newRep = new Profile({
                        GuildID : message.guild.id,
                        userID: argsUser.id,
                        rep: 0,
                        timeRep: moment().format('L')
                    })
                    newRep.save()
                } else {
                    out.rep = out.rep + 1
                    out.save()
                    let embed = new Discord.RichEmbed()
                        .setTitle(bot.config().emoji.check + ' REP')
                        .setColor(bot.config().color.SERVER)
                        .setDescription(`**${message.author.username}** | Вы повысили репутацию ${argsUser.username}`)
                    message.channel.send(embed).then(m => m.delete(10000)).catch(e => bot.utils().errorr(message, e))
                }
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(bot.config().emoji.cross + ' REP')
                    .setColor(bot.config().color.ERROR)
                    .setDescription(`**${message.author.username}** | Нельзя дать репутацию два раза в день, можно выдать **` + moment().endOf('day').fromNow() + '**')
                message.channel.send(embed).then(m => m.delete(10000)).catch(e => bot.utils().errorr(message, e))
            }
        })
    }
}