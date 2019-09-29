const Discord = require('discord.js');

function clean(text) {
    if (typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8205)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}

module.exports = {
    name: 'eval',
    description: 'Эмулятор кода.',
    aliases: ['eval'],
    use : '<code>',
    dm : false,

    async run(bot, message, args, footer) {
        if(!['410838014990876672'].includes(message.author.id)) return bot.utils().noReason(message, `**${message.author.username}** | Отказ в доступе!`)
        const code = args.join(" ")

        try {
            let evaled = eval(code);

            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            if(evaled === "Promise { <pending> }") return;
            if(code == 'bot.token') evaled = evaled.replace(bot.token, '!TOP SECRET!')
            
            const embed = new Discord.RichEmbed()
                .setTitle(`EVAL ✅`)
                .setColor(bot.config().color.DONE)
                .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${clean(evaled)}\`\`\``)     
            message.channel.send({embed})
        } catch (err) {
            const embed = new Discord.RichEmbed()
                .setTitle(`EVAL ❌`)
                .setColor(bot.config().color.ERROR)
                .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${clean(err)}\`\`\``)
            message.channel.send({embed})
        }
    }
}