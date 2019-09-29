let index = 0;

module.exports = async (bot) => {
	console.log('i\'m worker')

    bot.user.setPresence({ game: { name: `${bot.config().PREFIX}help` }, status: 'idle' });

	setInterval(() => {
	    let voice = 0;
	    bot.guilds.get("599982095875571722").channels.filter(chan => chan.type === "voice").forEach(channel => {
	        voice += channel.members.size;
	    });
	    bot.channels.get("613380359522091034").setName(`🔊 Войс онлайн: ${voice}`);
	    bot.channels.get("613380400483401758").setName(`👤 Участники: ${bot.guilds.get("599982095875571722").members.filter(x => !x.bot).size}`);

	    let time = bot.time() > '04:00:00' && bot.time() < '12:00:00' ? '🌄' : bot.time() > '12:00:01' && bot.time() < '18:00:00' ? '☀' : bot.time() > '18:00:01' && bot.time() < '21:00:00' ? '🌆' : bot.time() > '21:00:01' && bot.time() < '23:59:59' ? '🌜' : '🌃'

	    bot.channels.get("613380401133518868").setName(`${time} Время: ${bot.time()}`);
  	}, 60000);
}