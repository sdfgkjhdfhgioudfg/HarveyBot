const Discord = require('discord.js')
const shell = require('executive')

module.exports = {
    name: 'shell',
    description: 'Эмулировать terminal',
    aliases: ['shell'],
    use : '<bash code>',
    dm : false,

    async run(bot, message, args, footer) {
        if(!['410838014990876672'].includes(message.author.id)) return bot.utils().noReason(message, `**${message.author.username}** | Отказ в доступе!`)
        let arg = args.join(" ");
        if(!arg) return error("Не указан код выполнения");
        message.channel.send(bot.config().emoji.loading + `Oбработка команды`).then(mym =>{
            shell(arg, (e, r, b) => {
                if(e) return mym.edit(
                    new Discord.RichEmbed()
                    .setColor(bot.config().color.ERROR)
                    .setDescription(e));
                message.channel.send(r, {split: "\n", code: 'bash'}).catch(e => bot.utils().errorr(message, e))
                mym.delete()
            });
        })
    }
}