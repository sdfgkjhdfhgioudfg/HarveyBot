const Discord   = require('discord.js')
const Profile   = require('../database/model/profile.js');
const ecoFunc   = require('../auto_func/eco_func.js');
const sysWarn   = require('../auto_func/systemWarn.js')
const sysAFK    = require('../auto_func/systemAFK.js')
const db        = require('../database/db.js')
const utils     = require('../utils.js')
let tet         = new Set()

module.exports  = async (bot, message) => {
    if (message.author.bot) return;

    db.no_connect(bot.config().ConnectDB, function(a) {
        if(a) {
            message.delete();
            let embed = new Discord.RichEmbed()
                .setTitle('❌ | !ERROR DB!')
                .setDescription('Соединение с **\'Базой Данных\'** утеряно, сохранение данных невозможно!')
                .setColor('#ff0000')
            message.channel.send(embed).then(msg => {
                msg.delete(1000 * 30)
            })
        } else {
            if(message.channel.type !== "dm") {
                sysAFK.systemAFK(message, bot);
                sysWarn.CAPS(message, Profile, bot);
                sysWarn.INVT(message, Profile, bot);
                ecoFunc.ECONOMY(message, Profile, bot);
            }

            let prefixes = [bot.config().PREFIX, `<@${bot.user.id}>`];
            let prefix = false;
            prefixes.forEach(prefix_ => {
                if (message.content.startsWith(prefix_)) {
                    prefix = prefix_;
                }
            })

            tet.forEach(tat => {
                if (message.content.startsWith(tat)) {
                    prefix = tat;
                }
            })
            if (prefix === false) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmdName = args.shift().toLowerCase();
            const command = bot.commands.get(cmdName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

            if (!message.content.startsWith(bot.config().PREFIX)) return;
            if (message.channel.type == "dm" && command.dm == false) return bot.utils().noReason(message, `**${message.author.username}** | Данная команда здесь не доступна!`)
            message.channel.startTyping();
            try {
                command.run(bot, message, args, ['Requested by ' + message.author.tag, message.author.avatarURL])
                message.channel.stopTyping();
            } catch (error) {
                bot.utils().noReason(message, '**Cannot read property \'name\' of null**');
                message.channel.stopTyping();
            };
        }
    })
}