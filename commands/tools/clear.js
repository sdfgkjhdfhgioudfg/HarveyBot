module.exports = {
    name: 'clear',
    description: 'Удалить определённое кол-во сообщений.',
    aliases: ['cls'],
    use : '<0 - 100> || <@user> <0 - 100>',
    dm : false,

    async run(bot, message, args, footer) {
        let count_all = 0
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return bot.utils().noPerms(message, "**Что-бы использовать clear у вас должно быть право** `MANAGE_MESSAGES`")
        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return bot.utils().noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
        if (!amount && !user) return bot.utils().noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
        if (amount > 100) return bot.utils().noReason(message, '**Укажите участника и количество сообщений, либо укажите количество сообщений не больше 100**')
        message.channel.fetchMessages({limit: amount}).then((messages) => {
            count_all = count_all + messages.size;
            if (user) {
                const filterBy = user ? user.id : bot.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, count_all);
            }
            if(user) { 
                bot.utils().done(message, `Было удалено **${count_all} ${bot.declOfNum(count_all, ['сообщение', 'сообщения', 'сообщений'])}** участника ${user}`)
            }
            if(!user) { 
                bot.utils().done(message, `Было успешно удалено **${count_all} ${bot.declOfNum(count_all, ['сообщение', 'сообщения', 'сообщений'])}**`)
            }
            message.channel.bulkDelete(messages).catch(e => bot.utils().errorr(message, e))
        })
    }
}