const Discord = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Написать от имени бота.',
    aliases: ['say'],
    use : '<msg>',
    dm : false,

    async run(bot, message, args, footer, callback) {
        if(!args[0]) return bot.utils().noReason(message, "📝 Укажите сообщение !")
        let say = message.content.slice((p + 'say').length);
        message.channel.send(say).catch(e => bot.utils().errorr(message, e)).then(() => {
            callback(true)
        })
    }
}