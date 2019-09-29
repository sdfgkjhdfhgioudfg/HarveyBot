const Discord = require('discord.js')

module.exports = {
    name: 'rules',
    description: 'rules',
    aliases: ['rules'],
    dm : false,

    async run(bot, message, args, footer) {
        if(!['410838014990876672'].includes(message.author.id)) return bot.utils().noReason(message, `**${message.author.username}** | Отказ в доступе!`)
        let embed = new Discord.RichEmbed()
        if(args[0] == 'info') {
            embed.setTitle('Информация')
            embed.addField('● -= Категории =- ●\n\n● STATS', '\\🔊 Войс онлайн - Войс онлайн на этом сервере.\n\\👤 Участники - Участники это-го сервера.\n\\🕒 Время - Время по МСК.\n')
            embed.addField('● INFO', '\\❕information - Информация о сервере.\n\\📚rules - Правила сервера.\n\\🤝partners - Наши партнёры.\n\\📡announcements - Объявления о всякой всячины.\n\\📬streams - Стримы.\n')
            embed.addField('● COMMUNITY', '\\✉chat - Основной чат.\n\\👾bots - Чат для команд ботов.\n\\🔥flood - АНАРХИЯ!1!1!1! НО БЕЗ ПИАРА!1!1!1!\n\\🔊 GLOBAL VOICE - Просто голосовой чат.\n\\🔒 PRIVATE - Приватный чат.\n\\🎧 MUSIC - Только музыка.\n\\💤 AFK - Спи моя радость усни (AFK).\n')
            embed.addField('● DEV - Доступен если вы \'\\🛡 | STAFF\' и выше', 'log - Логи сервера.\ndev-chat - Чат для разработчеков.\n')
            embed.addField('● GAMING', 'looking-for-a-teammate - Поиск тиммейта.\nPUBG - Еее, играем в ПУБГ.\nMINECRAFT - А может кубики?\nAPEX - Просто играем в арех.\nFORTNITE - Может убьём БУРЮ?.\nLEAGUE OF LEGENDS - Лига? почему бы и нет.\nOSU! - Затыкиваем кружочки.\n')
            embed.addField('● STAFF - Доступен если вы \'\\🛡 | STAFF\' и выше', 'staff-chat - Чат для персонала.\n\\🐓 Руководство - Просто voice.\n')
            embed.addField('● -= Пользовательская информация =- ●', '**На нашем сервере есть система экономики, то-есть вы сможете зарабатывать и на заработные деньги что-то купить.\nНапример : Купить себе фон в профиль (x!setbg) или перевести любому желающему (x!pay <@user> <num>).\nТак-же у нас вы сможете поменять себе цвет ника (x!setcolor #hex).**')
            embed.setColor(bot.config().color.SERVER)
            embed.setFooter('-= Администрация сервера =-', 'https://forum.v-mp.ru/uploads/reactions/1499793238facebook-love-emoji-like-png.png')
            message.channel.send(embed)
        } else if(args[0] == 'rules') {
            embed.setTitle('Правила')
            embed.addField('Чаты', '1.1 - Запрещён спам, капс, пиар и т.д. Мут на 1 час.')
            embed.addField('NSFW', '1.1 - Запрещён контент 18+ в не положенных местах. Мут на 1 час.\n1.2 - Аватарки, Просьба сменить аватарку, или бан.')
            embed.addField('Неуважение пользователей', '1.1 - Оскорбления в любой форме. Мут на 1 час')
            embed.addField('Голосовые каналы', '1.1 - Ear rape (громкие крики), голосовой мут 1 час\n1.2 - Создание помех для общения, голосовой мут 10 мин\n1.3 - Частые переходы между каналами (Предупреждение +2)')
            embed.addField('Любой контент с целью пиара', '1.1 - Ссылки, Мут от 1 часа\n1.2 - Никнейм с ссылкой, Предупреждение +1\n1.3 - Спам в лс, кик\n1.4 - Продажа любого контента, бан')
            embed.setColor(bot.config().color.SERVER)
            embed.setFooter('-= Администрация сервера =-', 'https://forum.v-mp.ru/uploads/reactions/1499793238facebook-love-emoji-like-png.png')
            message.channel.send(embed)
        }
    }
}

module.exports.help = {
    name: '',
    aliases: [],
    
    type : 'mod',
    args : ['none'],
    desc : ''
};