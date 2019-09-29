const Discord = require('discord.js')

function list(name, cname, bot) {
    return {
        name : cname,
        d : bot.commands.filter(cmd => cmd.category == name).map(cmd => `**${bot.config().PREFIX}${cmd.name} ${cmd.use} — ${cmd.description}**`)
    }
}

function _$(message, bot, cmds, cmd = 0, footer, page) {
    let params = '`[...]` — Необязательный параметр\n`<...>` — Обязательный параметр\n`||` — Aргумент или\n\n';
    let tempDesc = '';
    let embed = new Discord.RichEmbed()
        .setTitle(`[ ${cmds.d.length} ] Commands module > **${cmds.name}**`)
        for (let i in cmds.d) {
            cmd++;
            if (page === 1 && cmd <= 10) {
                tempDesc += `${cmds.d[i]}\n`
                embed.setDescription(params + tempDesc.replace(/undefined/g, ''));
            }

            if (cmd >= page * 10 - 9 && page > 1) {
                tempDesc += `${cmds.d[i]}\n`
                embed.setDescription(params + tempDesc.replace(/undefined/g, ''));
            }
            embed.setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10), footer[1])
        }    
        embed.setColor(bot.config().color.SERVER)
        embed.setTimestamp()

    let error = new Discord.RichEmbed()
        .setTitle(`[ 0 ] Commands module > **${cmds.name}**`)
        .setColor('#ff0000')
        .setDescription(params + '**Такой странице не существует.**')
        .setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10), footer[1])
        .setTimestamp()

    return {
        embed : cmd < page * 10 - 10 && page > 1 || page <= 0 ? error : embed
    }
}

module.exports = {
    name: "help",
    description: "Списак команд.",
    aliases: ["h"],
    dm: false,
    use: '[cmds]',

    async run(bot, message, args, footer) {
        let command = bot.commands.get(args[0]);
        if(!command) {
            let type = 'help'
            let count = 1;

            let emoji = ['📛', '💰', '🎮', '🖥', '🎶', 'ℹ', '🔞', '🚸', '😁', '🛠', '⭕', '◀', '▶'];

            let embedG = new Discord.RichEmbed()
                .setTitle(`[ ${bot.commands.size} ] Помощь для **${message.author.username}**`)
                .setDescription(`**📛 | ADMIN\n💰 | ECONOMY\n🎮 | GAME\n🖥 | IMAGE\n🎶 | MUSIC\nℹ | INFO\n🔞 | NSFW\n🚸 | OTHER\n😁 | REACTION\n🛠 | TOOLS**`)
                .addField('Меню Help', `[\\📛 - \\🎶] - Кликабельные Emoji\n\\⭕ - Вернутся на это страницу.\n[\\◀ - \\▶] - Переход на новую страницу.\n\n${bot.config().PREFIX}help [cmds] - Узнать информацию о команде.`)
                .setColor(bot.config().color.SERVER)
                .setFooter(...footer)
                .setTimestamp()

            let msg = await message.channel.send(embedG).catch(e => console.log(e))
                for(var i = 0; i < emoji.length; i++)
                    await msg.react(emoji[i])

            const filter = (reaction, user) => {
                return emoji.includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector = msg.createReactionCollector(filter, { time: 1000 * 60 * 5 });

            collector.on('collect', async e => {
                let m = e.emoji.name;

                if(m == '📛'){
                    count = count - count + 1
                    type = 'admin'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '💰'){
                    count = count - count + 1
                    type = 'economy'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🎮'){
                    count = count - count + 1
                    type = 'game'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🖥'){
                    count = count - count + 1
                    type = 'image'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == 'ℹ'){
                    count = count - count + 1
                    type = 'info'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🔞'){
                    count = count - count + 1
                    type = 'nsfw'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🚸'){
                    count = count - count + 1
                    type = 'other'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '😁'){
                    count = count - count + 1
                    type = 'reaction'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🛠'){
                    count = count - count + 1
                    type = 'tools'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '🎶'){
                    count = count - count + 1
                    type = 'music'
                    await msg.edit(_$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count).embed)
                    await e.remove(message.author.id)
                }

                if(m == '⭕'){
                    count = count - count + 1
                    type = 'help'
                    await msg.edit(embedG)
                    await e.remove(message.author.id)
                }

                if(m == '◀'){
                    await e.remove(message.author.id);
                    if(type == 'help') return;
                    var ten = _$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count -= 1);
                    await msg.edit(ten.embed);
                }

                if(m == '▶'){
                    await e.remove(message.author.id);
                    if(type == 'help') return;
                    var ten = _$(message, bot, list(type, type.toUpperCase(), bot), 0, footer, count += 1);
                    await msg.edit(ten.embed);
                }
            });
        } else {
            let embed = new Discord.RichEmbed()
                .setTitle('ℹ | Информация о команде')
                .setDescription(`**NAME: ${command.name}\nDESCRIPTION: ${command.description}\nALIASES: ${command.aliases == 0 ? 'none' : command.aliases.join('; ')}\nDM: ${command.dm ? 'yes' : 'no'}\nCATEGORY: ${command.category}\nUSE: ${!command.use ? 'none' : command.use}**`)
                .setColor(bot.config().color.SERVER)
                .setFooter(...footer)
                .setTimestamp()
            message.channel.send(embed)
        }
    }
};