const Discord = require('discord.js');
var stringSimilarity = require('string-similarity');

module.exports = {
    name: 'avatar',
    description: 'Узнать аватар пользователя.',
    aliases: ['ava'],
    use : '[@user || Nickname]',
    dm : false,

    async run(bot, message, args, footer){

        let member = message.guild.member(
            message.mentions.users.first() || 
            message.guild.members.get(args[1]) || 
            bot.users.filter(c => c.username == stringSimilarity.findBestMatch(!args[0] 
                ? message.author.username 
                : args[0], bot.users.map(c => c.username)).bestMatch.target
            ).map(i => i.id)[0]
        )

        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author

        const embed = new Discord.RichEmbed()
            .setTitle(`Аватарка пользователя ${argsUser.username}`)
            .setImage(argsUser.avatarURL)
            .setFooter(...footer)
            .setColor(bot.config().color.SERVER)
            .setTimestamp();
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
}