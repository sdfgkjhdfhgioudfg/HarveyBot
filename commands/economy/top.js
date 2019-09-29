const Discord = require("discord.js");
const Top = require('../../lib/database/model/profile')
const request = require("request")

module.exports = {
    name: 'top',
    description: 'Узнать топ сервера.',
    aliases: ['rank'],
    use : '[mod]',
    dm : false,

    async run(bot, message, args, footer) {
        let req = args[0] == 'lvl' ? 'lvl' : args[0] == 'coin' ? 'coin' : args[0] == 'xp' ? 'xp' : args[0] == 'rep' ? 'rep' : 'lvl'
        let req_res = req == 'lvl' ? 'Уровню' : req  == 'coin' ? 'Деньгам' : req  == 'xp' ? 'XP' : req == 'rep' ? 'Репутации' : 'lvl'

        Top.find({
            GuildID: message.guild.id
        }).sort([
            [req, 'descending']
        ]).exec((err, res) => {
            if (err) console.log(err);

            let embed = new Discord.RichEmbed()
                .setTitle(`!TOP ${res.length} SERVER! по ` + req_res)
                //if there are no results
                if (res.length === 0) {
                    embed.setColor(bot.config().color.ERROR);
                    embed.addField("No data found", 'База Данных не зарегистрирована')
                } else if (res.length < 10) {
                    //less than 10 results
                    embed.setColor(bot.config().color.SERVER);
                    for (i = 0; i < res.length; i++) {
                        let top = i == 0 ? '🥇' : i == 1 ? '🥈' : i == 2 ? '🥉' : ''
                        let nxtLvlXp = res[i].lvl * 300;
                        let difference = nxtLvlXp - res[i].xp;
                        let member = message.guild.members.get(res[i].userID) || "User Left"
                        if (member === "User Left") {
                            if(req == 'lvl') embed.addField(`[${i + 1}] ${top} ${member}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'xp') embed.addField(`[${i + 1}] ${top} ${member}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'coin') embed.addField(`[${i + 1}] ${top} ${member}`, `**| COINS : ${res[i].coin}**`);
                            if(req == 'rep') embed.addField(`[${i + 1}] ${top} ${member}`, `**| REP : ${res[i].rep}**`);
                        } else {
                            if(req == 'lvl') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'xp') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'coin') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| COINS : ${res[i].coin}**`);
                            if(req == 'rep') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| REP : ${res[i].rep}**`);
                        }
                    }
                } else {
                    embed.setColor(bot.config().color.SERVER);
                    for (i = 0; i < 10; i++) {
                        let top = i == 0 ? '🥇' : i == 1 ? '🥈' : i == 2 ? '🥉' : ''
                        let nxtLvlXp = res[i].lvl * 300;
                        let difference = nxtLvlXp - res[i].xp;
                        let member = message.guild.members.get(res[i].userID) || "User Left"
                        if (member === "User Left") {
                            if(req == 'lvl') embed.addField(`[${i + 1}] ${top} ${member}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'xp') embed.addField(`[${i + 1}] ${top} ${member}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'coin') embed.addField(`[${i + 1}] ${top} ${member}`, `**| COINS : ${res[i].coin}**`);
                            if(req == 'rep') embed.addField(`[${i + 1}] ${top} ${member}`, `**| REP : ${res[i].rep}**`);
                        } else {
                            if(req == 'lvl') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'xp') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| LVL: ${res[i].lvl} [${Math.round(res[i].xp, -1)} / ${Math.round(difference, -1)}]**`);
                            if(req == 'coin') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| COINS : ${res[i].coin}**`);
                            if(req == 'rep') embed.addField(`[${i + 1}] ${top} ${member.user.username}`, `**| REP : ${res[i].rep}**`);
                        }
                    }
                }
            message.channel.send(embed).catch(e => bot.utils().errorr(message, e))
        })
    }
}