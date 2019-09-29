const Discord = require('discord.js')
const config = require('../../config.js').CONFIG
let unauthorized = '613397313208975391'
let verifed = '613397378438791168'

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function utils(type, message) {
	let embed = new Discord.RichEmbed()
		if(type == 'done') {
			embed.setTitle(`${config().emoji.check}| ${message}`)
			embed.setColor('#00ff00')
		} else if (type == 'err') {
			embed.setTitle(`${config().emoji.cross}| ${message}`)
			embed.setColor('#b70000')
		} else {
			console.error(`Такой конструкции нет!`)
		}
	return embed
}

function generateMathProblem(termscMin = 2, termscMax = 3, termMin = 1, termMax = 9){
    const termsc = random(termscMin, termscMax);
    const terms = new Array(termsc).fill(0).map(() => random(termMin, termMax));
    const operations = new Array(termsc - 1).fill(0)
        .map(() => random(0, 2))
        .map(v => ['+', '-', '*'][v]);
    let expression = '';
    terms.forEach((v, i, a) => expression += `${v}${i == a.length - 1 ? '' : ` ${operations[i]} `}`);
    return { expression, answer: eval(expression) };
}

module.exports = async (bot, member) => {
	if(['599982095875571722'].includes(member.guild.id)) {
		const dm = await member.createDM();
		member.addRole(unauthorized);

	    let problem = generateMathProblem();
	    let embed = new Discord.RichEmbed()
	    	.setTitle('!Добро пожаловать на наш сервер!\n\nДля авторизации на сервере вам нужно решить вопрос:')
	    	.addField('Сколько будет: ', problem.expression)
	    	.addField('Форма отправки ответа:', '!ответ\n\n**Пример:**\n\`2 + 2 = ?\` | !4\nЕсли вы хотите получить новое выражение просто отправьте неправильный ответ.')
	    	.setColor('#ffd500')
	    dm.send(embed).catch(e => utils.errorr(message, e))

	    const collector = dm.createMessageCollector(msg => msg.content.startsWith('!'));
	    collector.on('collect', message => {
	        const answer = message.content.substring(1);
	        if (answer == problem.answer) {
	            dm.send(utils('done', 'Вы были успешно авторизованы!'));
	            member.removeRole(unauthorized);
	            member.addRole(verifed)
	            collector.stop();
	        } else {
	            problem = generateMathProblem();
	            dm.send(utils('err', `Неверный ответ.\nНовое выражение: \`${problem.expression} = ?\``)).catch(e => utils.errorr(message, e))
	        }
	    });
	}	
}