const Discord = require('discord.js');

const hexreg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

module.exports = {
    name: 'setcolor',
    description: 'Установить цвет на ник!',
    aliases: ['sc'],
    use : '<#hex>',
    dm : false,

    async run(bot, message, args, footer) {
        if (!args[0]) return bot.utils().noPerms(message, 'Вы не указали цвет'); 
        if (!args[0].match(hexreg)) return bot.utils().noPerms(message, 'Вы указали неправильную структуру цвета');
        const role = message.member.roles.find(role => /^🎨 ║ #([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(role.name))
        if (role) {
            message.member.removeRole(role);
        }

        message.guild.createRole({
            "permissions" : 0,
            "name" : `🎨 ║ ${args[0]}`, 
            "color" : args[0],
            "position" : 80
        }).then((role) => {
            message.member.addRole(role);
            let embed = new Discord.RichEmbed()
                .setAuthor('Твой цвет изменен на ' + `${args[0]}`, message.author.avatarURL)
                .setColor(`${args[0]}`)
            message.channel.send(embed).then(m => m.delete(10000)).catch(e => bot.utils().errorr(message, e))
        });
    }
}