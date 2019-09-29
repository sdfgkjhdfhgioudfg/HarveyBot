const { RichEmbed } = require('discord.js')
const Profile = require('../../lib/database/model/profile')

module.exports = {
    name: 'query',
    description: 'Выполнить запрос к базе данных.',
    aliases: ['q'],
    use : '<query>',
    dm : false,

    async run(bot, message, args, footer) {
        if(!['410838014990876672'].includes(message.author.id)) return bot.utils().noReason(message, `**${message.author.username}** | Отказ в доступе!`)
        let type = args[0],
            db   = bot.isNumeric(args[2]) ? args[2] : 0

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author

        Profile.findOne({
            GuildID : message.guild.id,
            userID : argsUser.id
        }, async (err, data) => {
            if(!data) return bot.utils().noReason(message, `**${argsUser.username}** | Не зарегистрирован в **\`базе данных\`**!`)
            if(type == 'data.coin') data.coin = db
            else if(type == 'data.xp') data.xp = db
            else if(type == 'data.lvl') data.lvl = db
            else if(type == 'data.numbg') data.numBG = db
            else if(type == 'data.warns') data.warn = db
            else if(type == 'data.rep') data.rep = db
            else if(type == 'data.daily') data.daily = db
            else { return bot.utils().noReason(message, `**${message.author.username}** | Метода **${type.toUpperCase()}** не существует!`) }

            data.save()
            if(member.id == message.author.id) bot.utils().done(message, `**${message.author.username}** | Был выполнен запрос к **${type.toUpperCase()}** и был изменён на **${db}**`)
            else {bot.utils().done(message, `**${message.author.username}** | У **${argsUser.username}** был изменён параметр **${type.toUpperCase()}** на значение **${db}**`)}
        })
    }
}