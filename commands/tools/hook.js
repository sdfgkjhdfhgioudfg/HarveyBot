module.exports = {
    name: 'hook',
    description: 'Создать WebHook',
    aliases: ['hook'],
    use : '<title> <desc> [color] [avatarURL]',
    dm : false,

    async run(bot, message, args, footer) {
        if(!args[0]) return bot.hook(message.channel, 'Использование Хуки', `${bot.config().PREFIX}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> - Обязательно.\n[] не Обязательно.**`, `ffd500`, 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png');
        let hookArgs = message.content.slice(bot.config().PREFIX.length + 4).split(",");
        bot.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);
	}
}

module.exports.help = {
    name: '',
    aliases: [],
    
    type : 'tools',
    args : [''],
    desc : '.'
};