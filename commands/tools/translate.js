const Discord = require('discord.js');
const request = require("request")

module.exports = {
    name: 'translate',
    description: 'Yandex переводчик.',
    aliases: ['переведи'],
    use : '<lang> <msg>',
    dm : false,

    async run(bot, message, args, footer) {
        let lng = args[0];
        if(lng != "aa" && lng != "ab" && lng != "af" && lng != "am" && lng != "an" && lng != "ar" && lng != "as" && lng != "ay" && lng != "az" && lng != "ba" && lng != "be" && lng != "bg" && lng != "bh" && lng != "bi" && lng != "bn" && lng != "bo" && lng != "br" && lng != "ca" && lng != "co" && lng != "cs" && lng != "cy" && lng != "da" && lng != "de" && lng != "dz" && lng != "el" && lng != "en" && lng != "eo" && lng != "es" && lng != "et" && lng != "eu" && lng != "fa" && lng != "fi" && lng != "fj" && lng != "fo" && lng != "fr" && lng != "fy" && lng != "ga" && lng != "gd" && lng != "gl" && lng != "gn" && lng != "gu" && lng != "gv" && lng != "ha" && lng != "he" && lng != "iw" && lng != "hi" && lng != "hr" && lng != "ht" && lng != "hu" && lng != "hy" && lng != "ia" && lng != "id" && lng != "in" && lng != "ie" && lng != "ii" && lng != "ik" && lng != "io" && lng != "is" && lng != "it" && lng != "iu" && lng != "ja" && lng != "jv" && lng != "ka" && lng != "kk" && lng != "kl" && lng != "km" && lng != "kn" && lng != "ko" && lng != "ks" && lng != "ku" && lng != "ky" && lng != "la" && lng != "li" && lng != "ln" && lng != "lo" && lng != "lt" && lng != "lv" && lng != "mg" && lng != "mi" && lng != "mk" && lng != "ml" && lng != "mn" && lng != "mo" && lng != "mr" && lng != "ms" && lng != "mt" && lng != "my" && lng != "na" && lng != "ne" && lng != "nl" && lng != "no" && lng != "oc" && lng != "om" && lng != "or" && lng != "pa" && lng != "pl" && lng != "ps" && lng != "pt" && lng != "qu" && lng != "rm" && lng != "rn" && lng != "ro" && lng != "ru" && lng != "rw" && lng != "sa" && lng != "sd" && lng != "sg" && lng != "sh" && lng != "si" && lng != "sk" && lng != "sl" && lng != "sm" && lng != "sn" && lng != "so" && lng != "sq" && lng != "sr" && lng != "ss" && lng != "st" && lng != "su" && lng != "sv" && lng != "sw" && lng != "ta" && lng != "te" && lng != "tg" && lng != "th" && lng != "ti" && lng != "tk" && lng != "tl" && lng != "tn" && lng != "to" && lng != "tr" && lng != "ts" && lng != "tt" && lng != "tw" && lng != "ug" && lng != "uk" && lng != "ur" && lng != "uz" && lng != "vi" && lng != "vo" && lng != "wa" && lng != "wo" && lng != "xh" && lng != "yi" && lng != "ji" && lng != "yo" && lng != "zh" && lng != "zh" && lng != "zu") return bot.utils().noReason("Ты не выбрая язик перевода, например **`a!translate eu ru Привет`**, или просто перейди по [ссылке](https://snipp.ru/view/137)")
        let txt = args.join(" ").replace(`${lng}`, "");
        request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181202T195027Z.a57565d4a85d089a.c0204f150bbaf72674ee2dbdd5d2faa8114b5c47&text=${encodeURIComponent(txt)}&lang=${lng}`, (err, res, body) => {
        let arr = JSON.parse((body));
        let trEmb = new Discord.RichEmbed()
            .setTitle(`Переводчик`)
            .addField("До перевода", `\`\`\`\n${txt}\n\`\`\``)
            .addField("После перевода", `\`\`\`\n${arr.text}\n\`\`\``)
            .setColor(bot.config().color.SERVER)
            .setThumbnail('https://yandex.ru/images/search?pos=0&img_url=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F281%2F281776.png&text=icon+translate+google&rpt=simage')
            .setFooter('Выбранный язык > ' + arr.lang)
            .setTimestamp();
            message.channel.send(trEmb).catch(e => bot.utils().errorr(message, e))
        })
    }
}