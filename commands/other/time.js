const Discord = require('discord.js');

module.exports = {
    name: 'time',
    description: 'Узнать текущее время.',
    aliases: ['time'],
    dm : false,

    async run(bot, message, args, footer, callback) {
        let rand = Math.floor(Math.random() * 50) + 0;

        function times() {
            let arr = {
                5: {"evening" : ", я диспетчер, вам не нужен секс на вечер?"},
                4: {"night"   : "Спи, ночь на дворе!"},
                3: {"morning" : "Бодрое"},
                2: {"evening0": "Добрейший вечерок!"},
                1: {"day"     : ", я предстовитель компании **ОРИФЛЕЙМ**, прошу вас ознакомит..."},
                0: {"night0"  : "Ложись, завтра не встанешь!"}
            }

            let rand   = Math.floor(Math.random() * 5) + 0;

            var title  = arr[rand].evening  || "!",
                title0 = arr[rand].morning  || "Доброе",
                title1 = arr[rand].night    || "Спокойной ночи!",
                title2 = arr[rand].evening0 || "Добрый вечер" + title,
                title3 = arr[rand].day      || "!",
                title4 = arr[rand].night0   || "Спокойной ночи!"
            ;
            
            if(bot.time() > '04:01:00' && bot.time() < '12:00:60'){
                let embed = new Discord.RichEmbed()
                .setTitle(`☀ | ${title0} утро!`)
                .setDescription(`**${message.author.username}** | Сейчас **${bot.time()}**`)
                .setColor("#ffa500");
                message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
            }
            
            if(bot.time() > '12:01:00' && bot.time() < '18:00:60'){
                let embed = new Discord.RichEmbed()
                .setTitle("🌞 | Добрый день" + title3)
                .setDescription(`**${message.author.username}** | Сейчас **${bot.time()}**`)
                .setColor("#ffd500");
                message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
            }
            
            if(bot.time() > '18:01:00' && bot.time() < '22:00:60'){
                let embed = new Discord.RichEmbed()
                .setTitle(`🌄 | ${title2}`)
                .setDescription(`**${message.author.username}** | Сейчас **${bot.time()}**`)
                .setColor("#FF7F00");
                message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
            }
            
            if(bot.time() > '22:01:00' && bot.time() < '23:59:60'){
                let embed = new Discord.RichEmbed()
                .setTitle(`🌕 | ${title4}`)
                .setDescription(`**${message.author.username}** | Сейчас **${bot.time()}**`)
                .setColor("#1C1C1C");
                message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
            }

            if(bot.time() > '00:00:00' && bot.time() < '04:00:60'){
                let embed = new Discord.RichEmbed()
                .setTitle(`✨ | ${title1}`)
                .setDescription(`**${message.author.username}** | Сейчас **${bot.time()}**`)
                .setColor("#1C1C1C");
                message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
            }
        }

        if(rand == 3){
            if(bot.time() > '21:59:59' && bot.time() < '23:59:59' || bot.time() > '00:00:00' && bot.time() < '03:33:33'){
                let embed = new Discord.RichEmbed()
                .setTitle(`🔴 | Кровавая луна маячет на горизонте!`)
                .setDescription(`**${message.author.username}** | Сейчас **66:66:66**`)
                .setColor("#ff0000");
                message.channel.send(embed);
            } else {
                times()
            }
        } else {
            times()
        }

        callback(true)
    }
}