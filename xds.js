const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone : true});
const fs = require('fs');
const cfg = require('./config.js').CONFIG;
const Enmap = require('enmap')
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');

require('./lib/function.js')(Discord, bot, ytdl);

bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.afk = new Map();
bot.afknum = 1;

bot.youtube = new YouTube(cfg().YouTube_API_V3);
bot.queue = new Map();
bot.votes = new Map();

(async function () {
	let bar = bot.bar({ text: '[ :min / :max ] > :bar < [ :percent% ] :ms :fullms' })
	let i = 0;

	fs.readdirSync('./commands').forEach(module => {
		const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			i++; const command = require(`./commands/${module}/${file}`);
			command.category = module;
			bot.commands.set(command.name, command);
			console.log(`| ${bar.render([i, commandFiles.length])} > Command \`${command.name.toUpperCase()}\` from category \`${module.toUpperCase()}\``)
			if(i / commandFiles.length * 100 == 100) console.log(`+- Module \`${module.toUpperCase()}\` loaded\n`)
			if(i == commandFiles.length) i = i - commandFiles.length
		}
	});

	fs.readdir('./lib/events/', function(err, files) {
		if(err) return console.error(err);
		files.forEach((file, i) => {
			if(!file.endsWith('.js')) return;
			const evt = require(`./lib/events/${file}`);
			let evtName = file.split('.')[0];
			bot.on(evtName, evt.bind(null, bot));
			console.log(`| ${bar.render([i + 1, files.length], '\x1b[34m')} | Event \`${evtName}\` loaded`);
			if(i + 1 == files.length) console.log(`+- All events loaded!\n`)
		});
	});
})();

bot.on('message', async (message) => {
	if(message.author.bot) return;

	let joke = bot.joke(message, {
		author: 'message.author',
		username: 'message.author.username',
		content: 'message.content.replace(T, ``)',
		percent: 'Math.round(Math.random() * (0 | 100))',
		oneuser: 'users()',
		twouser: 'users()'
	})
})

bot.login(cfg().BOT_TOKEN)