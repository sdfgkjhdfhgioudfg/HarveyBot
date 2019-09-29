const Discord = require('discord.js');

module.exports = {
    name: 'sms',
    description: 'Отправить sms пользователю.',
    aliases: [''],
    use : '<@user> <msg>',
    dm : true,

    async run(bot, message, args, footer) {
        let user = message.mentions.members.first();
        if (!user) {
            return bot.utils().noReason(message, "👤 Укажите получателя!")
        }
        const sendMessage = args.join(" ");
        let embed = new Discord.RichEmbed()
            .setTitle("📧 Новое сообщение")
            .addField("👤 Пользователь", `${message.author}`, true)
            .addField("📬 Прислал сообщение", `**${sendMessage.replace(user, '')}**`, true)
            .setColor(bot.config().color.SERVER)
            .setFooter(...footer)
            .setTimestamp();
        user.send({embed}).catch((e) => (
            bot.utils().errorr(message, e)
        ))
    }
}