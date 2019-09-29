const Discord = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Узнать информацию о сервере.',
    aliases: ['si'],
    dm : false,

    async run(bot, message, args, footer) {
        let verifilv = ['**Отсутствует**', '**Низкий**', '**Средний**', '**Высокий**', '**Очень высокий**'];
        let embed = new Discord.RichEmbed()
            .setTitle('Информация о сервере')
            .addField('Владелец', `**${message.guild.owner}**`, true)
            .addField('ID', `**${message.guild.id}**`, true)
            .addField('Регион', `**${message.guild.region}**`, true)
            .addField('Участники', `**${message.guild.presences.size} в сети\n${message.guild.memberCount} всего**`, true)
            .addField('Каналы', `**${message.guild.channels.filter(c => c.type == 'text').size} текстовых\n${message.guild.channels.filter(c => c.type == 'voice').size} голосовых**`, true)
            .addField('Уровень проверки', verifilv[message.guild.verificationLevel], true)
            .addField('AFK канал', message.channel.guild.afkChannel !== null ? message.channel.guild.afkChannel : '**Нету.**', true)
            .addField('Высшая роль', `**${message.channel.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name}**`, true)
            .addField('Имя сервера', `**${message.channel.guild.name}**`, true)
            .addField('Сокращеное имя сервера', `**${message.channel.guild.nameAcronym}**`, true)
            .addField('Ролей', `**${message.guild.roles.size}**`, true)
            .addField('Смайликов', `**${message.guild.emojis.size}**`, true)
            .addField('Большой сервер', message.guild.presences.size > 150 ? '**Да**' : '**Нет**')
            .setFooter('Сервер создан')
            .setTimestamp(new Date(message.guild.createdTimestamp))
            .setColor(bot.config().color.SERVER);
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
}