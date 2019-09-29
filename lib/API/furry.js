const axios = require('axios');
let sfwURL = 'https://api.furry.bot/furry/sfw/';
let nsfwURL = 'https://api.furry.bot/furry/nsfw/';

module.exports = async = {
	sfw: {
		boop: async function () {
			sfwRequest = sfwURL + 'boop';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		cuddle: async function () {
			sfwRequest = sfwURL + 'cuddle';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		fursuit: async function () {
			sfwRequest = sfwURL + 'fursuit';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		hold: async function () {
			sfwRequest = sfwURL + 'hold';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		hug: async function () {
			sfwRequest = sfwURL + 'hug';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		kiss: async function () {
			sfwRequest = sfwURL + 'kiss';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		},

		lick: async function () {
			sfwRequest = sfwURL + 'lick';
			let x = await axios.get(sfwRequest);
			let data = x.data.response;
			return data.image;
		}
	},

	nsfw: {
		bulge: async function () {
			nsfwRequest = nsfwURL + 'bulge';

			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		bang: async function () {
			nsfwRequest = nsfwURL + 'bang';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		cuddle: async function () {
			nsfwRequest = nsfwURL + 'cuddle';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		yiff: async function (endpoint = 'gay') {
			nsfwRequest = nsfwURL + 'yiff/' + endpoint;
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data;
		},

		hug: async function () {
			nsfwRequest = nsfwURL + 'hug';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		kiss: async function () {
			nsfwRequest = nsfwURL + 'kiss';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		lick: async function () {
			nsfwRequest = nsfwURL + 'lick';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		},

		suck: async function () {
			nsfwRequest = nsfwURL + 'suck';
			let x = await axios.get(nsfwRequest);
			let data = x.data.response;
			return data.image;
		}
	}
};