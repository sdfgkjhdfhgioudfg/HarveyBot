const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Кикнуть пользователя.',
    aliases: ['kick'],
    use : '<@user> [msg]',
    dm : false,

    async run(bot, message, args, footer) {
        if(!args[0]) return bot.utils().noReason(message, "Укажите пользователя !")
        let kUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
        if(!kUser) return bot.utils().noReason(message, "Неудолось найти данного пользователя !")
        let kReason = args.join(" ").slice(22) || "Причина не указанна!"
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return bot.utils().noPerms(message, "`MANAGE_MESSAGES`")
        if(kUser.hasPermission("MANAGE_MESSAGES")) return bot.utils().warn(message, "Такого пользователя нельзя кикнуть !");

        let embed = new Discord.RichEmbed()
        .setTitle("**Kick**")
        .setColor(bot.config().color.ERROR)
        .addField("Модератор", `${message.author}`, true)
        .addField("В канале", `${message.channel}`, true)
        .addField("Причина", `${kReason}`, true)
        .setFooter("Время")
        .setTimestamp();

        let incidentchannel = message.guild.channels.find(`name`, "log");
        if(!incidentchannel) return bot.utils().noReason(message, `Создайте канал **log**`)

        message.guild.member(kUser).kick(kReason);
        incidentchannel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
}