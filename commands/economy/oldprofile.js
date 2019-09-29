const Profile = require('../../lib/database/model/profile')
const Discord = require('discord.js')

module.exports = {
    name: 'old-profile',
    description: 'Посмотреть профиль пользователя.',
    aliases: ['o-p'],
    use : '[@user]',
    dm : false,

    async run(bot, message, args, footer, callback) {
        let E = ''
        let member = bot.getMember(message, !args[0] ? message.author.id : args[0])
        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author

        Profile.findOne({
            GuildID : message.guild.id,
            userID : argsUser.id
        }, async (err, data) => {
            if(!data) return bot.utils().noReason(message, `**${argsUser.username}** | Не зарегистрирован в **\`базе данных\`**!`)

            let nxtLvlXp = data.lvl * 300;
            let difference = nxtLvlXp - data.xp;

            const roles = member.roles
                .filter(r => r.id !== message.guild.id)
                .map(r => r.name) || 'none';

            if(roles.includes('Верифицирован')) E += bot.config().emoji.verified
            if(roles.includes('Партнёр')) E += bot.config().emoji.partners
            if(roles.includes('Разработчик')) E += '🛠 '

            let warn = data.warn < 1 ? 'Нету' : data.warn < 5 ? `${data.warn}/5:10 до мута` : `${data.warn}/10 до бана`

            let embed = new Discord.RichEmbed()
                .setTitle(E + `| Профиль ${argsUser.username}`)
                .setThumbnail(argsUser.avatarURL)
                .setColor(bot.config().color.SERVER)
                .addField(`${bot.config().emoji.coin}| Баланс`, `● **${data.coin}**`, true)
                .addField(`🌟 | Уровень ${data.lvl}`, `● **${Math.round(data.xp)} / ${Math.round(difference)} : x${bot.boost(data.rep)}**`, true)
                .addField(`🛑 | Предупреждений`, `● **${warn}**`, true)
                .addField(`📢 | Репутация`, `● **${data.rep}**`, true)
                .setFooter(...footer)
                .setTimestamp()

            message.channel.send(embed)
        })
    }
};