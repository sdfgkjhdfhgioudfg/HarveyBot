const Profile = require('../../lib/database/model/profile')

const { Attachment } = require('discord.js');
const { resolve, join } = require("path");
const { Canvas } = require("canvas-constructor");

async function profile(image, avatar, name, data) {
    let progress = data.xp / (data.lvl * 300) * 350
    Canvas.registerFont(resolve(join('./lib/fonts/AvertaDemoPECuttedDemo-Regular.otf')), "Averta");
    Canvas.registerFont(resolve(join('./lib/fonts/MINISYST.TTF')), "Minisystem");
    return new Canvas(400, 500)
        .addImage(image, 0, 0, 400, 500)
        .setColor("rgba(0, 0, 0, 0.5)")
        .addRect(25, 100, 350, 385)
        .setTextFont("20pt Averta")
        .setColor("#FFFFFF")
        .addText(name, 50, 280)
        .addText(`Level: ${data.lvl}`, 50, 320)
        .setTextAlign("left")
        .addText(`Coins: ${data.coin}`, 50, 360)
        .addText(`Rep: ${data.rep}`, 50, 400)
        .setColor('#FFFFFF')
        .addRect(25, 425, 350, 45)
        .setColor('#00b153')
        .addRect(25, 425, progress, 45)
        .setTextAlign("center")
        .setColor('#000000')
        .addText(`${data.xp}/${data.nxtXP}`, 200, 457)
        .addCircle(200, 120, 110)
        .addCircularImage(avatar, 200, 120, 110)
        .toBuffer()
};

module.exports = {
    name: 'profile',
    description: 'Посмотреть профиль пользователя.',
    aliases: ['profile'],
    use : '[@user]',
    dm : false,

    async run(bot, message, args, footer, callback) {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
        let argsUser
        if (member) argsUser = member.user
        else argsUser = message.author

        Profile.findOne({
            GuildID : message.guild.id,
            userID : argsUser.id
        }, async (err, data) => {
            if(!data) return bot.utils().noReason(message, `**${argsUser.username}** | Не зарегистрирован в **\`базе данных\`**!`)

            let nxtLvlXp = data.lvl * 300;
            let difference = nxtLvlXp - data.xp;

            let avatar = await bot.convertImage(argsUser.displayAvatarURL)
            let image = await bot.convertImage(bot.profileImage(data.numBG).image)

            await message.channel.send(new Attachment(await profile(image, avatar, argsUser.username, {
                lvl   : data.lvl,
                xp    : Math.round(data.xp, -1),
                nxtXP : Math.round(difference, -1),
                coin  : data.coin,
                rep   : data.rep
            }), `profile-${message.author.id}.jpg`)).catch(e => bot.utils().errorr(message, e))
        })
    }
};