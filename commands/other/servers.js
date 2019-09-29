const Discord = require('discord.js')

function servers(bot, cmd = 0, page, footer) {
    let sv = bot.guilds.map(m => m.name + " - " + m.memberCount)
    let tempDesc = ''

    let info = '\\⏪ | Вернутся в начало\n[\\◀ - \\▶] | Переход по страницам\n\\⏩ | В самый конец'

    let embed = new Discord.RichEmbed()
    .setTitle('📝 | Список всех серверов!')
    .setColor(bot.config().color.SERVER)
    for (let i in sv) {
        cmd++;
        if (page === 1 && cmd <= 10) {
            tempDesc += `${sv[i]}\n`
            embed.setDescription(`\`\`\`${tempDesc}\`\`\`\n${info}`);
        }

        if (cmd >= page * 10 - 9 && page > 1) {
            tempDesc += `${sv[i]}\n`
            embed.setDescription(`\`\`\`${tempDesc}\`\`\`\n${info}`);
        }
        embed.setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10), footer[1])
        embed.setTimestamp()
    }

    let error = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle(`Такой странице не существует.`)
        .setDescription(info)
        .setFooter('Страница ' + page + '/' + Math.ceil(cmd / 10), footer[1])
        .setTimestamp()

    return {
        embed : cmd < page * 10 - 10 && page > 1 || page <= 0 ? error : embed,
        max_page : Math.ceil(cmd / 10)
    }
}

module.exports = {
    name: 'server-list',
    description: 'Список всех серверов.',
    aliases: ['sv-list', 'svl'],
    dm : false,

    async run(bot, message, args, footer) {
        let tempDesc = ''
        let page = 1;
        let cmd = 0

        let emoji = ['⏪', '◀', '▶', '⏩'];

        let msg = await message.channel.send(servers(bot, 0, 1, footer)).catch(e => console.log(e))
            for(var i = 0; i < emoji.length; i++)
                await msg.react(emoji[i])

        const filter = (reaction, user) => {
            return emoji.includes(reaction.emoji.name) && user.id === message.author.id;
        };

        const collector = msg.createReactionCollector(filter, { time: 1000 * 60 * 5 });

        collector.on('collect', async e => {
            let m = e.emoji.name;

            if(m == '⏪') {
                e.remove(message.author.id)
                page = 1
                msg.edit(servers(bot, 0, page, footer).embed)
            }

            if(m == '◀') {
                e.remove(message.author.id)
                page = page -= 1
                msg.edit(servers(bot, 0, page, footer).embed)
            }

            if(m == '▶') {
                e.remove(message.author.id)
                page = page += 1
                msg.edit(servers(bot, 0, page, footer).embed)
            }

            if(m == '⏩') {
                e.remove(message.author.id)
                page = servers(bot, 0, page, footer).max_page
                msg.edit(servers(bot, 0, page, footer).embed)
            }
        })
    }
};