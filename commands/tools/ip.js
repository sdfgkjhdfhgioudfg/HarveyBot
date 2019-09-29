const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: 'ip',
    description: 'Покажу информацию о сайте',
    aliases: ['ip'],
    dm : false,

    async run(bot, message, args, footer) {
    	if(!args[0]) return bot.utils().noReason(message, `**${message.author.username}** | Укажите сайт!`)
    	const { body } = await snekfetch.get(`http://ip-api.com/json/${args[0]}`);
        let embed = new Discord.RichEmbed()
        	.setTitle(body.org)
        	.setColor(bot.config().color.SERVER)
        	.addField('as', body.as, true)
        	.addField('City', body.city, true)
        	.addField('Country', body.country, true)
        	.addField('CountryCode', body.countryCode, true)
        	.addField('isp', body.isp, true)
        	.addField('lat', body.lat, true)
        	.addField('lon', body.lon, true)
        	.addField('Query', body.query, true)
        	.addField('Region', body.region, true)
        	.addField('RegionName', body.regionName, true)
        	.addField('Status', body.status, true)
        	.addField('TimeZone', body.timezone, true)
        	.addField('Zip', body.zip == '' ? 'Нету' : body.zip, true)
        message.channel.send(embed)
    }
}