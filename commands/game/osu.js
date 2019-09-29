const Discord = require('discord.js');

module.exports = {
    name: 'osu',
    description: 'Посмотреть профель в OSU.',
    aliases: ['osu'],
    use : '<mod> <nick>',
    dm : false,

    async run(bot, message, args, footer) {
		let mode = args[0];
		let user = args[1];
		let link;
		if(!mode) return bot.utils().noReason(message, 'Не указан режим. \n**Режимы: `osu`, `taiko`, `ctb`, `mania`.**')
		if(!user) return bot.utils().noReason(message, 'Укажи пользователя')
		if(mode === 'osu') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
		if(mode === 'taiko') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=1&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
		if(mode === 'ctb') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=2&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`
		if(mode === 'mania') link = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=3&pp=2&countryrank&flagshadow&darktriangles&opaqueavatar&onlineindicator=undefined&xpbar`

		let embed = new Discord.RichEmbed()
			.setTitle(user)
			.setImage(link)
			.setColor(bot.config().color.SERVER)
			.setFooter(...footer)
		message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
	}
}