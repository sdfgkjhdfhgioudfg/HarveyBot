const Discord = require('discord.js');
const config = require('../../config.js').CONFIG;
const utils = require('../utils.js');
const ms = require('ms');

let mTM = config().number.MinVolue;
let lw = config().number.MaxVolue;

function getStringCapsPercent(string) {
    let str = string.trim().replace(/<a?:(.*?):\d+>/g, '');
    let length = str.replace(/[^a-zа-яA-ZА-ЯІЇЁёії]/g, '').length;
    if (length === 0) return;
    let caps = str.replace(/[^A-ZА-ЯІЇЁ]/g, '').length;
    return Math.round(caps / length * 100);
};

module.exports.CAPS = (message, Profile) => {
    let roless = message.guild.roles.find(`name`, message.channel.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name)
	let wUser = message.guild.member(message.author)
	    if (['dm', 'group', 'category', 'voice'].includes(message.channel.type)) return;

	    //if (['533311944417869824'].includes(message.channel.id)) return;
	    if (!message.member.roles.has(roless.id))
	    if (getStringCapsPercent(message.content) > 80 && message.content.replace(/<a?:(.*?):\d+>/g, '').replace(/[^a-zа-яA-ZА-ЯІЇЁёії]/g, '').length > 5 && message.content !== '' && !message.author.bot) {
	        let reason = 'Капс в чате. Сообщение:\n' + message.content;
	        Profile.findOne({
                GuildID : message.guild.id,
                userID : message.author.id,
	        }, (err, warn) => {
	            if(err) console.log(err)
	            if(!warn){
	                let newWarn = new Profile({
                		GuildID : message.guild.id,
                		userID : message.author.id,
	                    warn: 0
	                })
	                newWarn.save().catch(err => console.log(err))
	            } else {
	                warn.warn++
	                warn.save().catch(err => console.log(err))
	                utils.done(message, `${message.author} получил варн по причине \`КАПС В ЧАТЕ\``)

	                if(warn.warn == mTM){
	                    let muterole = message.guild.roles.find(`name`, "muted");

	                    let mutetime = "1h";
	                    wUser.addRole(muterole.id);
	                    utils.done(message, `<@${wUser.id}> был замучен на 1 час!`)

	                    setTimeout(function(){
	                        wUser.removeRole(muterole.id);
	                        wUser.addRole(mrole.id);
	                        utils.done(message, `<@${wUser.id}> был размучен!`)
	                    }, ms(mutetime))
	                }

	            if(warn.warn == 9){
	                message.delete();
	                message.author.send(`**${message.author.username}** ещё одно предупреждение и ты улетишь в бан!`)
	            }

	            if(warn.warn == lw){
	                message.guild.member(wUser).ban(reason);
	                utils.done(message, `<@${wUser.id}> был забанен!`)
	            }  

	            if(reason === null || typeof reason === 'undefined') reason = 'Причина не указана.';
	            if(warn.warn == lw){
	                message.guild.member(wUser).ban(reason);
	                utils.done(message, `<@${wUser.id}> улетел в бан!!`)
	            }
	        }
	    })
	}
}

module.exports.INVT = (message, Profile) => {
	let wUser = message.guild.member(message.author);
    let arr = ['T C O L'];
    //if (!['541846624335560716'].includes(message.channel.id)) return;
    //if (!message.member.roles.has('411018019863658497'))
    message.guild.fetchInvites().then(invites => {
        invites.forEach(invite => {
            arr.push(invite.code);
        });
        let matches = message.content.match(/discord(app\.com\/invite|\.gg|\.me|\.io)\/?([_a-zA-Z0-9]{1,32})/gi);
        if (matches)
        matches.forEach(async (match) => {
            let mtch = match.match(/discord(app\.com\/invite|\.gg|\.me|\.io)\/?([_a-zA-Z0-9]{1,32})/i);
            if (!arr.includes(mtch[3])) {
                let reason = 'Отправил инвайт ссылку: '+match;
                message.delete();
                Profile.findOne({
                	GuildID : message.guild.id,
                	userID : message.author.id,
                }, (err, warn) => {
                    if(err) console.log(err)
                    if(!warn){
                        let newWarn = new Profile({
                			GuildID : message.guild.id,
                			userID : message.author.id,
                            warn: 0
                        })
                        newWarn.save().catch(err => console.log(err))
                    } else {
                        warn.warn++
                        warn.save().catch(err => console.log(err))

                        if(warn.warn == mTM){
                            let muterole = message.guild.roles.find(`name`, "muted");

                            let mutetime = "1h";
                            wUser.addRole(muterole.id);
                            utils.done(message, `<@${wUser.id}> был замучен на 1 час!`)

                            setTimeout(function(){
                                wUser.removeRole(muterole.id);
                                wUser.addRole(mrole.id);
                                utils.done(message, `<@${wUser.id}> был размучен!`)
                            }, ms(mutetime))
                        }

                        if(warn.warn == 9){
                            message.delete();
                            message.author.send(`**${message.author.username}** ещё одно предупреждение и ты улетишь в бан!`)
                        }

                        if(warn.warn == lw){
                            message.guild.member(wUser).ban(reason);
                            utils.done(message, `<@${wUser.id}> был забанен!`)
                        }  

                        if(reason === null || typeof reason === 'undefined') reason = 'Причина не указана.';
                        if(warn.warn == lw){
                            message.guild.member(wUser).ban(reason);
                            utils.done(message, `<@${wUser.id}> улетел в бан!!`)
                        }
                    }
                })
                utils.done(message, `${message.author} получил варн по причине \`РЕКЛАМА\``)
            }
        })
    });
}