module.exports.CONFIG = () => {
	return {
		BOT_TOKEN : process.env.TOKEN,
		PREFIX : 'h!',

		color : {
			DONE : parseInt('0x00ff00'),
			ERROR : parseInt('0xff0000'),
			WARNING : parseInt('0xffff00'),
			SERVER : parseInt('0xffd500')
		},

		channel : {
			log : ''
		},

		emoji : {
			loading : '<a:loading:574291498103996416> ',
			cross : '<:cross1:576706947395354634> ',
			check : '<:check1:576706984955478016> ',
			verified : '<:verified:577546075288633354> ',
			verified_gif: '<a:Verified:619499400086945812> ',
			partners : '<:partner:577568849587732499> ',
			online : '<:online:577575757975650304> ',
			invis : '<:invisible:577575719450837038> ',
			idle : '<:idle:577575792868065292> ',
			dnd : '<:dnd:577575831648600075> ',
			stream : '<:stream:577576527135506445> ',
			coin : '<:coins:615773638133547020> '
		},

		YouTube_API_V3: process.env.YTAV3,
		ConnectDB : process.env.DB,

    	number : {
    		MinVolue : 5,
    		MaxVolue : 10
    	}
	}
}
