const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'temp-mute',
    description: 'Дать пользователю мут.',
    aliases: ['tm'],
    use : '<@user> <1s/m/h/d>',
    dm : false,

    async run(bot, message, args, footer) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return bot.utils().noPerms(message, `**${message.author.username}** | Недостатодно прав!`)
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!tomute) return bot.utils().noReason(message, `**${message.author.username}** | Неудолось найти данного пользователя.`);
        if(tomute.hasPermission("MANAGE_MESSAGES")) return bot.utils().noReason(message, `**${message.author.username}** | Такого пользователя нельзя за мутить!`);
        let reason = args.slice(2).join(" ") || 'Причина не указана.'

        let muterole = message.guild.roles.find(`name`, "muted");

        if(!muterole){
            try{
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions:[]
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }catch(e){
                console.log(e.stack);
            }
        }

        let mutetime = args[1];
        if(!mutetime) return bot.utils().noReason(message, "Вы не указали время!");

        try{
            await tomute.send(`Вам был выдан мут на ${mutetime}`)
            await bot.utils().done(message, `**${message.author.username}** | ${tomute} был выдан мут **${mutetime}** по причине **${reason}**`)
        }catch(e){
            bot.utils().noReason(message, `**${message.author.username}** | ЛС ${tomute} отключен, но мут выдан на ${mutetime}`)
        }

        let muteembed = new Discord.RichEmbed()
            .setDescription(`Модератор ${message.author.username}`)
            .setColor(bot.config().color.SERVER)
            .addField("Пользователь", tomute)
            .addField("За мучен в", message.channel)
            .addField("Время", message.createdAt)
            .addField("Длительность", mutetime)
            .addField("Причина", reason);

        let log = message.guild.channels.find(`name`, "log");
        if(!log) return bot.utils().noReason(message, "Создайте канал **log**");
        log.send(muteembed)

        await(tomute.addRole(muterole.id));

        setTimeout(function(){
            tomute.removeRole(muterole.id);
            bot.utils().done(message, `${tomute} раз мучен.`);
        }, ms(mutetime));
    }
}