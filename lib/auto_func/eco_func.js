const Discord = require('discord.js')

module.exports.ECONOMY = (message, Profile, bot) => {
	let addXP = bot.random(5, 15)
	let addCoins = bot.random(30, 70)
    let addCoin1 = bot.random(30, 70)

    let add = addCoins == addCoin1 ? addCoins : 0
    if(add == addCoins){
        let embed = new Discord.RichEmbed()
        .setDescription(`**${message.author.username}** Добавленно **${add}$**`)
        .setColor('#ffd500')
        message.channel.send(embed).then(msg => {
            msg.delete(10000)
        })
    }

    Profile.findOne({
        GuildID : message.guild.id,
        userID: message.author.id
    }, (err, out) => {
        if(err) console.log(err)
        if(!out){
            let newEco = new Profile({
                GuildID : message.guild.id,
                userID : message.author.id,
                username : message.author.username,
                SV_name : message.channel.guild.name,
    			daily: '',
                rep : 0,
                timeRep : '',
    			coin: 0,
    			warn: 0,
    			lvl: 0,
    			xp: 1,
                numBG : 0
            })
            newEco.save(function(err, res) {
                if (err) return console.log(err);
            })
        } else {
            let nxtLvl = out.lvl * 300;
            out.xp = out.xp + addXP * bot.boost(out.rep)
            out.coin = out.coin + add
            out.save(function(err, res) {
                if (err) return console.log(err);
            });
            if(nxtLvl <= out.xp){
                let curlvl = out.lvl; + 1
                out.lvl = curlvl + 1;
                out.xp = out.xp - out.xp

                let embed = new Discord.RichEmbed()
                    .setTitle('!LVL UP!')
                    .setDescription(`**${out.username} | Поздравляю с получением ${curlvl + 1} уровня!!**`)
                    .setColor('#ffd500')
                    .setFooter(message.author.tag, message.author.avatarURL)
                message.channel.send(embed).then(msg => {
                    msg.delete(10000)
                })
            }
        }
    })
}