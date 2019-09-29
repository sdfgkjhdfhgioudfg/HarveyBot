const vm = require('vm')

const codeContext = {};
vm.createContext(codeContext);

module.exports = {
    name: 'run',
    description: 'Эмулировать песочницу.',
    aliases: ['run'],
    use : '<code>',
    dm : false,

    async run(bot, message, args, footer) {
        try {
            let evaled = vm.runInContext(args.join(" "), codeContext);
            message.channel.send(evaled, {code:"js",split:"\n"});
        } catch(e) {
            message.channel.send(e, {code:"js",split:"\n"});
        }
    }
}