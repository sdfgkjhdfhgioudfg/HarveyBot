const Discord = require('discord.js');
const moment = require('moment')

function data() {
    let year = new Date().getFullYear()
    let diff = new Date(moment().format('L')) - new Date('11/17/2001')
    let birthday = new Date(`11/17/${year}`) - new Date(moment().format('L'))

    return {
        Age : Math.round(diff / 1000 / 60 / 60 / 24 / 30 / 12 - 1),
        Birthday : Math.round(birthday / 1000 / 60 / 60 / 24)
    }
}

module.exports = {
    name: 'creator',
    description: 'Информация о создетеле.',
    aliases: ['dev'],
    dm : false,

    async run(bot, message, args, footer) {
        let date = await bot.fetchUser('410838014990876672')
        let bar = bot.bar({ text: ':bar [ :percent% ]', type : 'discord' })

        let dateB = data().Birthday

        let embed = new Discord.RichEmbed()
            .setTitle('About my creator: ' + date.tag)
            .setDescription('🚀 **Thank you for creating me!** 😘')
            .addField('🔻 Age', '▪ **' + data().Age + ' years**', true)
            .addField('🔻 Happy Birthday', dateB == 0 ? '🎂 **TODAY** 🎉' : '🎂 **' + dateB + ' days**', true)
            .addField('📚 Interests', '**\\📝 Programming\n\\🚀 Space\n\\🐾 Furry\n\\🎮 Games\n\\🎶 Music**', true)
            .addField('📊 Stats', `**\\▪ ${bar.render([67, 100])}\n\\▪ ${bar.render([56, 100])}\n\\▪ ${bar.render([89, 100])}\n\\▪ ${bar.render([69, 100])}\n\\▪ ${bar.render([78, 100])}**`, true)
            .setThumbnail(date.avatarURL)
            .setColor(message.guild.me.displayHexColor)
        message.channel.send(embed)
    }
}