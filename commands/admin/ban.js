const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'За банить пользователя.',
    aliases: ['ban'],
    use : '<@user> [reason]',
    dm : false,
    
    async run(bot, message, args, footer) {
        if(!args[0]) return bot.utils().noReason(message, "Укажите пользователя!")
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return bot.utils().noReason(message, "Неудолось найти данного пользователя!")
        let bReason = args.join(" ").slice(22) || "Причина не указанна!"
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return bot.utils().noPerms(message, "`MANAGE_MESSAGES`")
        if(bUser.hasPermission("MANAGE_MESSAGES")) return bot.utils().warn(message, "Такого пользователя нельзя за банить!");
    
        let embed = new Discord.RichEmbed()
            .setDescription(`Пользователь ${bUser} был за банен!`)
            .setColor(bot.config().COLOR.SERVER)

        message.guild.member(bUser).ban(bReason);
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }   
}