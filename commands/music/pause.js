module.exports = {
    name: 'pause',
    description: 'Поставить трек на паузу.',
    aliases: ['pause'],
    use : '',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        
        if (queue && queue.playing) {
            queue.playing = false;
            queue.connection.dispatcher.pause();
            return bot.utils().noReason(message, `🎵 Музыка уже остановилась`);
        }

        return bot.utils().noReason(message, '⚠ Музыка не играет.');
    }
}