const Discord = require('discord.js');

module.exports = {
    name: 'choose',
    description: 'Сделать выбор.',
    aliases: ['choose'],
    use : '<text 1 | ...text 10>',
    dm : false,

    async run(bot, message, args, footer, callback) {
        let Args = message.content.slice(8).split(" | ");
        if(Args.length > 11) return bot.utils().noReason(message, `**${message.author.username}** | Слишком много выборов.`)
        let out = Args[Math.round(Math.random() * Args.length)]
        if(out == undefined) out = Args[0]
        let embed = new Discord.RichEmbed()
            .addField('⬇ | INPUT', '**' + Args.join(' | ').toUpperCase().replace(/ \| /g, '** or **') + '**')
            .addField('⬇ | OUTPUT', `**${out.toUpperCase()}**`)
            .setColor(bot.config().color.SERVER)
            .setFooter(...footer)
            .setTimestamp();
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e)).then(() => {
            callback(true)
        })
    }
}