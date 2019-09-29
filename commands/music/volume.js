module.exports = {
    name: 'volume',
    description: 'Умтановить громкость музыки',
    aliases: ['vol'],
    use : '<0 - 100>',
    dm : false,

    async run(bot, message, args) {
        let queue = bot.queue.get(message.guild.id);
        if (!queue) return bot.utils().noReason(message, '⚠ Музыка не играет.');
        
        if (!args[0]) return bot.utils().done(message, `🎵 Данная громкасть: **${queue.volume}/100**`);
        if (isNaN(args[0])) return bot.utils().noReason(message, `${message.author}, Пожалуйста, введи громкость от 0 до 100! ${bot.config().PREFIX}volume <volume>`);
        if (args[0] < 0 || args[0] > 100) return bot.utils().noReason(message, `${message.author}, Пожалуйста, введи громкость от 0 до 100! ${bot.config().PREFIX}volume <volume>`);

        queue.volume = args[0];
        queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

        return bot.utils().done(message, `🎵 Громкость теперь установлена на **${queue.volume}/100**`);
    }
};