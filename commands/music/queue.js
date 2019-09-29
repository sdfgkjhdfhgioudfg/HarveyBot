const discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Узнать текущую музыку.',
    aliases: ['queue'],
    use : '',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        if (!queue) return bot.utils().noReason(message, '⚠ Музыка не играет.');

        let embed = new discord.RichEmbed()
            .setColor('RANDOM')
            .setThumbnail(bot.user.avatarURL)
            .setDescription(`**-=- Music Queue -=-**\n${queue.musics.map(music => 
                `**-** ${music.title}`).join('\n')}\n\n🎵 **В настоящее момент играет:** ${queue.musics[0].title}`);
        message.channel.send(embed);
    }
};