module.exports = {
    name: 'skip',
    description: 'Пропустить музыку',
    aliases: ['skip'],
    use : '',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        let votes = bot.votes.get(message.guild.id);
        if (!message.member.voiceChannel) return bot.utils().noReason(message, `${message.author}, Пожалуйста, присоединь к голосовому каналу, чтобы выполнить эту команду! ${bot.config().PREFIX}skip`);
        if (!queue) return bot.utils().noReason('⚠ No musics are being played.');

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            if (votes.voters.includes(message.author.id)) return bot.utils().noReason(message, `⚠ ${message.author}, вы уже проголосовали! **${votes.votes}/3** голосов!`, `${bot.config().PREFIX}skip`);

            votes.votes++
            votes.voters.push(message.author.id);
            bot.utils().noReason(message, `🎵 ${message.author}, ты уже проголосовали за то, чтобы пропустить! **${votes.votes}/3** голосов!`);

            if (votes.votes > 3) return queue.connection.dispatcher.end();
        } else return queue.connection.dispatcher.end();
    }
};