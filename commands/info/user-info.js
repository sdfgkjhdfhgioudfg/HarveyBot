const strftime = require('strftime')
const discord = require('discord.js');

module.exports = {
    name: 'user-info',
    description: 'Узнать информацию о пользователе.',
    aliases: ['si'],
    use : '<user id>',
    dm : false,

    async run(bot, message, args, footer) {
        let id = args[0]
        // if(!id || typeof id == 'string') return bot.utils().noReason(message, `**${message.author.username}** | Введите корректный ID пользователя!`)
        let data = await bot.fetchUser(id)
        
        let statuses = {
            online: ' В сети',
            idle: ' Нет на месте',
            dnd: ' Не беспокоить',
            offline: ' Не в сети'
        }
        let game
        let setGame = statuses[data.presence.status]
        if (!data.presence.game) game = `Cтатус **${setGame}**`
        else if (data.presence.game.type == 0) game = ` Играет в **${data.presence.game.name}**`
        else if (data.presence.game.type == 1) game = ` Стримит [**${data.presence.game.name}**](${data.presence.game.url})`
        else if (data.presence.game.type == 2) game = ` Слушает **${data.presence.game.name}**`
        else if (data.presence.game.type == 3) game = ` Смотрит **${data.presence.game.name}**`

        let day = 1000 * 60 * 60 * 24
        let date1 = new Date(message.createdTimestamp)
        let date2 = new Date(data.createdTimestamp)
        let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))

        function msgInfo(data) {
            return {
                lMID : data.lastMessageID ? `**lastMessageID : ${data.lastMessageID}**\n` : '**lastMessageID : Нету**\n',
                lM : data.lastMessage ? `**lastMessage : ${data.lastMessage}\n` : '**lastMessage : Нету**\n',
                reply : data.reply ? `**reply : ${data.reply}**` : '**reply : Нету**'
            }
        }

        let embed = new discord.RichEmbed()
            .setTitle('User Info: ' + data.tag)
            .setThumbnail(data.avatarURL)
            .setDescription(game)
            .addField('Username:', `**${data.username}**`, true)
            .addField('#Tag:', `**${data.discriminator}**`, true)
            .addField('User ID:', `**${data.id}**`, true)
            .addField('This is Bot?', data.bot ? '**Yes**' : '**No**', true)
            .addField('Message Info (only this Server)', msgInfo(data).lMID + msgInfo(data).lM + msgInfo(data).reply)
            .addField('Дата регистрации: ', `**${strftime('%d.%m.%Y в %H:%M', new Date(data.createdTimestamp))}\n(${diff1} дн. назад)**`, true)
            .setColor(bot.config().color.SERVER)
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
};