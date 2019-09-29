const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Пожаловатся на пользователя.',
    aliases: ['report'],
    use : '<@user> [msg]',
    dm : false,

    async run(bot, message, args, footer) {
        if(!args[0]) return bot.utils().noReason(message, "Укажите пользователя !")
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return bot.utils().noReason(message, "Неудолось найти данного пользователя !")
        let rreason = args.join(" ").slice(22) || "Причина не указанна!"

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("**Reports**")
        .setColor(bot.config().color.ERROR)
        .addField("Пользователь", `${message.author}`, true)
        .addField("Жалоба на", `${rUser}`, true)
        .addField("Канал", message.channel, true)
        .addField("Причина", rreason, true)
        .setFooter("Время")
        .setTimestamp();

        let reportschannel = message.guild.channels.find(`name`, "log");
        if(!reportschannel) return bot.utils().noReason(message, `Создай канал **log**`)

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed).catch(e => bot.utils().errorr(message, e))
    }
}