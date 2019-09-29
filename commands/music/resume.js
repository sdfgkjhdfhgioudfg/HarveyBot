module.exports = {
    name: 'resume',
    description: 'Возбновить музыку.',
    aliases: ['resume'],
    use : '',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        
        if (queue && !queue.playing) {
            queue.playing = true;
            queue.connection.dispatcher.resume();
            return bot.utils().done(message, `🎵 Музыка возобновлена.`);
        }
        
        return bot.utils().noReason(message, '⚠ Музыка не играет.');
    }
};