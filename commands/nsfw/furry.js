const Discord = require('discord.js');
const furry = require('../../lib/API/furry')
const array = new Array()

module.exports = {
    name: 'furry',
    description: 'Furry картинки (Определяются каналом | nsfw - 18+ или sfw - 16+)',
    aliases: ['furry'],
    use : '<type>',
    dm : false,

    async run(bot, message, args, footer) {
        if(!message.channel.nsfw) return bot.utils().noReason(message, `**${message.author.username}** | Контент 18+ можно использовать только в **NSFW** каналах.`)
        let names = message.channel.name
        let name = names == 'nsfw' ? 'nsfw' : names == 'sfw' ? 'sfw' : 'sfw'

        array.splice(0, array.length)

        for(i of Object.keys(furry[name]))
            array[array.push()] = `**${bot.config().PREFIX}furry ${i} - ${await bot.lang(message, i)}**`

        if(['help'].includes(args[0])) {
            let embed = new Discord.RichEmbed()
                .setTitle('Список доступных команд для это-го канала')
                .setDescription(array.join('\n'))
                .setColor(bot.config().color.SERVER)
                .setFooter(...footer)
                .setTimestamp()
            message.channel.send(embed).then(() => {
                array.splice(0, array.length)
            })
        } else {
            let out = await furry[name][!args[0] ? 'hug' : args[0]](args[1])

            let embed = new Discord.RichEmbed()
                .setColor(bot.config().color.SERVER)
                .setImage(out)
                .setFooter(...footer)
                .setTimestamp()
            message.channel.send(embed)
        }
    }
}