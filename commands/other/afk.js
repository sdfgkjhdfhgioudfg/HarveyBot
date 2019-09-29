const Discord = require('discord.js');

module.exports = {
    name: 'afk',
    description: 'Уйти в AFK',
    aliases: ['afk'],
    use : '[reason]',
    dm : false,

    async run(bot, message, args, footer, callback){
        let reason = args.join(' ') ? args.join(' ') : 'Не указанно';
        let afklist = bot.afk.get(message.author.id);
        if (!afklist) {
            let construct = {
                id: message.author.id,
                username: message.author.username,
                reason: reason
            };

            let embed = new Discord.RichEmbed()
                .setTitle(`**${message.author.username}** отошел, скоро вернётся!`)
                .setDescription('Причина: ' +  reason)
                .setColor(bot.config().color.SERVER)
                .setThumbnail('http://cs9.pikabu.ru/images/big_size_comm_an/2017-01_4/1484607602192974027.gif')
                .setFooter(...footer)
            message.channel.send(embed).then(msg => {
                msg.react('💤')
            }).catch(e => bot.utils().errorr(message, e)).then(() => {
                callback(true)
            })
            bot.afk.set(message.author.id, construct);
        }
    }
}