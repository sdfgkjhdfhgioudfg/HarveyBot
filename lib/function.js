const moment = require('moment')

let arrTime = new Array()

function diff(min, max) {
	var date1 = new Date(min);
	var date2 = new Date(max);

	var diff = date2.getTime() - date1.getTime();

	return parseInt(Math.floor(diff / 1000) + '000');
}

function ms2string(ms) {
    const s = 1000;
    const m = s * 60;
    const h = m * 60;
    const d = h * 24;

    const part = (ms, m, name) => {
        const t = Math.floor(ms / m);
        return t > 0 ? `${t}${name}` : '';
    };

    return [
        part(ms, d, 'd'),
        part(ms % d, h, 'h'),
        part(ms % d % h, m, 'm'),
        part(ms % d % h % m, s, 's')
    ].filter(p => p).slice(0, 2).join(' ') || '0s';
}

function Bar(data) {
	this.render = function(arr, color = '\x1b[32m') {
		let time = new Date(new Date().getTime() + 3*60*60*1000).toISOString().replace(/(.*?)T/, '').replace(/\..+/, '')
		const hrStart = process.hrtime();
        const hrDiff = process.hrtime(hrStart);

		let ratio = 10;
		let m = Math.round(arr[0] / arr[1] * 100);
		let t = Math.floor(m / ratio);

		let reg = data.reg ? data.reg : 'g';
		let type = data.type == 'console' ? 'console' : data.type == 'discord' ? 'discord' : 'console';

		arrTime[arrTime.push()] = `${moment().format('L')} ${time}`
		let load = ['|', '/', '-', '\\']

		return data.text
			.replace(new RegExp(':min', reg), arr[0])
			.replace(new RegExp(':max', reg), arr[1])
			.replace(new RegExp(':bar', reg), type == 'console' ? [color, `▬`.repeat(t), '\x1b[0m', `▬`.repeat(ratio - t)].join('') : type == 'discord' ? ['[',`▬`.repeat(t),'](https://vk.com/nikita.feed/)', `▬`.repeat(ratio - t)].join('') : '')
			.replace(new RegExp(':percent', reg), m)
			.replace(new RegExp(':ms', reg), `${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms`)
			.replace(new RegExp(':fullms=on', reg), ms2string(diff(arrTime[0], arrTime[arr[0]])))
			.replace(new RegExp(':fullms=off|:fullms', reg), ms2string(diff(arrTime[0], arrTime[arr[1]])))
			.replace(new RegExp(':excess', reg), arr[0] > arr[1] ? arr[0] - arr[1] : 0)
			.replace(new RegExp(':load=on', reg), load[arr[0] % load.length])
			.replace(new RegExp(':load=off|:load', reg), load[diff(arrTime[0], arrTime[arr[0]]) / 1000 % load.length])
			.replace(/:[a-zA-Z]+/g, '')
	}
}

module.exports = (discord, bot, ytdl) => {
	bot.config = () => require('../config.js').CONFIG()
	
	bot.time = (z = 3) => new Date(new Date().getTime() + z*60*60*1000).toISOString().replace(/(.*?)T/, '').replace(/\..+/, '')

	bot.convertImage = async (image) => {
		const { loadImage } = require('canvas')
		const snekfetch = require("snekfetch")
		const { body: buffer } = await snekfetch.get(image);
        let avatar = await loadImage(buffer);
        return avatar;
	}

	bot.isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

	bot.declOfNum = (number, titles) => {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	};

	bot.boost = (rep) => Math.round((rep >= 0 ? (Math.log(rep + 1) / Math.log(10)) + 1 : 50 / (rep - 50) * -1) * 10) / 10
	
	bot.profileImage = (num) => {
		let img, price, error;
	    if(num == 0) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784113811423237/D-_images_-Discord__Untitled-1_03.png'
	        price = 3000
	    } else if(num == 1) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784297505423370/D-_images_-Discord__Untitled-1_05.png';
	        price = 5000
	    } else if(num == 2) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784236603867147/D-_images_-Discord__Untitled-1_07.png';
	        price = 4500
	    } else if(num == 3) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784302987247617/D-_images_-Discord__Untitled-1_12.png';
	        price = 6000
	    } else if(num == 4) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784337191665684/D-_images_-Discord__Untitled-1_13.png';
	        price = 5500
	    } else if(num == 5) {
	        img = 'https://cdn.discordapp.com/attachments/593779332489412618/593784308926513172/D-_images_-Discord__Untitled-1_14.png';
	        price = 6000
	    } else {
	        error = 'Токо-го фона нет!'
	    }

	    return {
	        'image' : img,
	        'price' : price,
	        'err' : error
	    }
	}

	bot.hook = (channel, title, message, color, avatar) => {
	    if(!channel) return message.channel.send('Канал не указан.');
	    if(!title) return message.channel.send('Название не указано.');
	    if(!message) return message.channel.send('Сообщение не указано.');
	    if(!color) color = 'ffd500';
	    if(!avatar) avatar = 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png';

	    color = color.replace(/\s/g, '');
	    avatar = avatar.replace(/\s/g, '');

	    channel.fetchWebhooks().then(webhook => {
	        let foundhook = webhook.find('name', 'Webhook');

	        if(!foundhook){
	            channel.createWebhook('Webhook', 'https://api.icons8.com/download/bbcbec656c1f5ee1de8b408fc852609f7238ddf7/Color/PNG/512/Logos/webhook-512.png')
	            .then(webhook => {
	                webhook.send('', {
	                    "username" : title,
	                    "avatarURL" : avatar,
	                    "embeds" : [{
	                        "color" : parseInt(`0x${color}`),
	                        "description" : message
	                    }]
	                }).catch(err => {
	                    let embed = new Discord.RichEmbed()
	                    .setTitle("❌ Ошибка")
	                    .setDescription("**Что-то не так!**")
	                    .setColor("#b70000");
	                    console.log(err)
	                    return channel.send(embed);
	                })
	            })
	        } else {
	            foundhook.send('', {
	                "username" : title,
	                "avatarURL" : avatar,
	                "embeds" : [{
	                    "color" : parseInt(`0x${color}`),
	                    "description" : message
	                }]
	            }).catch(err => {
	                let embed = new Discord.RichEmbed()
	                .setTitle("❌ Ошибка")
	                .setDescription("**Что-то не так!**")
	                .setColor("#b70000");
	                console.log(err)
	                return channel.send(embed);
	            })
	        }
	    })
	}

	bot.random = (min, max) => Math.round(Math.random() * (max - min + 1)) + min;
	bot.lang = async (message, txt) => {
		const snekfetch = require('snekfetch');
		let lng = message.guild.region == 'russia' ? 'ru' : 'en' 
		const { body } = await snekfetch.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181202T195027Z.a57565d4a85d089a.c0204f150bbaf72674ee2dbdd5d2faa8114b5c47&text=${encodeURIComponent(txt)}&lang=${lng}`);
		return body.text;
	}

	bot.utils = () => require('./utils')

	bot.joke = (message, data) => {
		let R = new Array()
		let chance = Math.round(Math.random() * (0 | 100))

		for(i of Object.keys(data)) {
			let M = new RegExp(`:${i}`, 'g')
			R.push(`.replace(${M}, ${data[i]})`)
		}

		let users = () => {
			let users = bot.users.map(i => i.id)
			return `<@${users[Math.round(Math.random() * users.length)]}>`
		}

		return {
			send(text, key, C = 10) {
				if(typeof key == 'string') {
					let Y = new RegExp(text, 'i')
					let T = message.content.match(Y)

					if(T == text && chance > 0 && chance < C) {
						message.channel.send(eval(`key${R.join('')}`))
					}
				} else if(typeof key == 'object') {
					let Y = new RegExp(text, 'i')
					let T = message.content.match(Y)
					let A = new Array()

					if(T == text && chance > 0 && chance < C) {
						for(i of Object.keys(key)) {
							A.push(`.${i}('${key[i]}'${R.join('')})`)
						}
						message.channel.send(eval(`new discord.RichEmbed()${A.join('')}`))
					}
				} else {
					throw new Error('Unknown object: ' + typeof key)
				}
			}
		}
	}

	bot.getMember = (message, toFind = '') => {
		toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
 
        if (!target) 
            target = message.member;
            
        return target;
	}

	bot.bar = (data) => new Bar(data)

	bot.type = (value) => {
		var regex = /^\[object (\S+?)\]$/;
		var matches = Object.prototype.toString.call(value).match(regex) || [];

		return (matches[1] || 'undefined').toLowerCase();
	}

	bot.handleVideo = async (video, message, vc, playlist = false) => {
        let queue = bot.queue.get(message.guild.id);
        let music = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };

        if (!queue) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: vc,
                connection: null,
                musics: [],
                volume: 50,
                playing: true
            };
            let voteConstruct = {
                votes: 0,
                voters: []
            };

            bot.queue.set(message.guild.id, queueConstruct);
            bot.votes.set(message.guild.id, voteConstruct)
            queueConstruct.musics.push(music);

            try {
                var connection = await vc.join();
                queueConstruct.connection = connection;
                bot.play(message.guild, queueConstruct.musics[0]);
            } catch (err) {
                bot.queue.delete(message.guild.id);
                console.error(`Я не смог подключиться к этому голосовому каналу: ${err}`);
            }
        } else {
            queue.musics.push(music);
            if (playlist) return;
            else return message.channel.send(`🎵 **${music.title}** был добавлен в очередь`);
        }
        return;
    }

    bot.play = (guild, music) => {
        let queue = bot.queue.get(guild.id);
        let votes = bot.votes.get(guild.id)
        if (!music) {
            queue.voiceChannel.leave();
            bot.queue.delete(guild.id);
            bot.votes.delete(guild.id);
            return queue.textChannel.send(`🎵 Воспроизведение музыки закончилось`);
        }

        let dispatcher = queue.connection.playStream(ytdl(music.url))
            .on('end', () => {
                queue.musics.shift();
                votes.votes = 0;
                votes.voters = [];
                setTimeout(() => {
                    bot.play(guild, queue.musics[0]);
                }, 250);
            })
            .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        queue.textChannel.send(`🎵 **${music.title}** сейчас играет`);
    }
}