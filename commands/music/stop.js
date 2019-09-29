module.exports = {
    name: 'stop',
    description: 'Остановить музыку',
    aliases: ['leave'],
    use : '',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        if (!message.member.voiceChannel) return utils.noReason(message, `${message.author}, Пожалуйста, присоединись к голосовому каналу, чтобы выполнить эту команду! ${bot.config().PREFIX}stop`);
        if (!queue) return bot.utils().noReason(message, '⚠ Музыка не играет.');

        queue.musics = [];
        queue.connection.dispatcher.end();
    }
};