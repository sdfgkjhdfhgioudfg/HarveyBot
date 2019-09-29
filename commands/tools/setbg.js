const { RichEmbed } = require('discord.js')
const Profile = require('../../lib/database/model/profile')

module.exports = {
    name: 'setbg',
    description: 'Установить backgroung в профиль.',
    aliases: ['setbg'],
    use : '<0-5> || N/A',
    dm : false,

    async run(bot, message, args, footer) {
        let ags = bot.isNumeric(args[0]) ? args[0] : 'err'
        if(ags == 'err') {
            let embed = new RichEmbed()
                .setTitle('Пред просмотр')
                .setImage('https://cdn.discordapp.com/attachments/593779332489412618/593779832731467807/wiev1.png')
                .setColor(bot.config().color.SERVER)
                .setFooter(...footer)
            message.channel.send(embed)
        } else {
            Profile.findOne({
                GuildID : message.guild.id,
                userID : message.author.id
            }, async (err, data) => {
                if(!data) return bot.utils().noReason(message, `**${message.author.username}** | Не зарегистрирован в **\`базе данных\`**!`);
                if(bot.profileImage(ags).err) return bot.utils().noReason(message, `**${message.author.username}** | ${bot.profileImage(ags).err}`)
                if(data.numBG == ags) return bot.utils().noReason(message, `**${message.author.username}** | У вас уже есть этот фон!`);
                if(data.coin < bot.profileImage(ags).price) return bot.utils().noReason(message, `**${message.author.username}** | Вам не хватает ${images(ags).price - data.coin}`);
                else {
                    data.numBG = ags;
                    data.coin = data.coin - bot.profileImage(ags).price;
                    data.save();
                    bot.utils().done(message, `**${message.author.username}** | Фон успешно изменён!`)
                }
            })
        }
    }
}