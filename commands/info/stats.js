const Discord = require('discord.js');
const os = require('os')
const memory = require("memory");

module.exports = {
    name: 'stats',
    description: 'Узнать статистику бота.',
    aliases: ['stats'],
    dm : false,

    async run(bot, message, args, footer) {
        let ping = message.createdTimestamp - Date.now(), ping1 = Date.now() - message.createdTimestamp
        let filter = (ping < 0) ? ping1 : ping
        let allowMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        let used = process.memoryUsage();

        let embed = new Discord.RichEmbed()
            .setTitle(bot.config().emoji.loading + "Stats")
            .addField("• Platform", os.platform(), true)
            .addField("• Hostname", os.hostname(), true)
            .addField("• OS_TYPE", os.type(), true)
            .addField("• CPU", `\`\`\`${os.cpus()[0].model}\`\`\``, true)
            .addField(`• MEMORY ${Math.round(memory() / allowMemory * 100)}%`, `\`\`\`RSS Использует ${memory()} MB / ${allowMemory} MB.\nОсновная память занимает ${(Math.round(used['heapUsed'] / 1024 / 1024 * 100) / 100).toFixed(0)} MB.\nВнешняя память составляет ${(Math.round(used['external'] / 1024 / 1024 * 100) / 100).toFixed(0)} MB.\`\`\``, true)
            .addField("• PING", filter, true)
            .addField("• API", bot.pings.join("ms ") + 'ms', true) 
            .addField("• ARCH", os.arch(), true)
            .addField("• Library", `discord.js **11.4.2**`, true)
            .addField("• UPTIME", `\`\`\`${Math.round(bot.uptime / (1000 * 60 * 60 * 24))} дня(дней), ${Math.round(bot.uptime / (1000 * 60 * 60))} часа(ов), ${Math.round(bot.uptime / (1000 * 60)) % 60} минут, ${Math.round(bot.uptime / 1000) % 60} секунд\`\`\``, true)
            .setFooter(...footer)
            .setTimestamp()
            .setColor(bot.config().color.SERVER);
        message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
    }
}