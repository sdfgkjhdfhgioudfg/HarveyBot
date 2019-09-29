const Discord = require('discord.js');
const Profile = require('../../lib/database/model/profile')

module.exports = {
    name: 'pay',
    description: 'Перечислить деньги пользователю.',
    aliases: ['pay'],
    use : '<@user> <num>',
    dm : false,

    async run(bot, message, args, footer, callback) {
        let member = message.mentions.members.first()
        let add = bot.isNumeric(args[1]) ? args[1] : 0
        if(add == 0) return bot.utils().noReason(message, '**Введи коректное число!**');
        if(!member) return bot.utils().noReason(message, `**${message.author.username}** | Ты не выбрал пользователя!`);
        if(add < 0) return bot.utils().noReason(message, `**${message.author.username}** | Нельзя отправить меньше чем **0**!`);
        if(member.id == message.author.id) return bot.utils().noReason(message, `**${message.author.username}** | Нельзя отправить деньги самому себе!`)

        let argsUser
        if (member) argsUser = member.user
        Profile.findOne({
            GuildID : message.guild.id,
            userID: message.author.id
        }, (err, out) => {
            if(!out) return bot.utils().noReason(message, `${message.author.username} | Не зарегистрирован в **\`базе данных\`**!`)
            if(out.coin < add) return bot.utils().noReason(message, `**${message.author.username}** | Тебе не хватает **${add - out.coin}$**`)
                out.coin = out.coin - add
                Profile.findOne({
                    GuildID : message.guild.id,
                    userID: argsUser.id
                }, (err, out1) => {
                    if(!out1) return bot.utils().noReason(message, `**${argsUser.username}** | Не зарегистрирован в **\`базе данных\`**!`)
                    out1.coin = out1.coin + add
                    out1.save()
                    bot.utils().done(message, `**${message.author.username}** | Ты успешно перевел **${add}$** на баланс **${argsUser.username}**\nНа твоём щету осталось **${out.coin}**`)
                })
            out.save()
        })
    }
}