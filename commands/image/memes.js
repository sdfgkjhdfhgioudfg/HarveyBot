const Discord = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = {
    name: 'meme',
    description: 'Показату мем.',
    aliases: ['meme'],
    dm : false,

    async run(bot, message, args, footer) {
        const { body } = await snekfetch.get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week').query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => post.data.over_18);
        if (!allowed.length) return bot.utils().noReason(message, `**${message.author.username}** | Мемы закончились! Повторите попытку позже.`);
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
            .setTitle('Author: ' + allowed[randomnumber].data.author)
            .setDescription(allowed[randomnumber].data.title)
            .addField("Другая информация:", "❤ **" + allowed[randomnumber].data.ups + " 📄 " + allowed[randomnumber].data.num_comments + '**')
            .setImage(allowed[randomnumber].data.url)	    
            .setColor(bot.config().color.SERVER)
            .setFooter(...footer)
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
};