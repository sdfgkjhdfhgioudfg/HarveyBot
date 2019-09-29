const Discord = require('discord.js')

module.exports = async (bot, oldMember, newMember) => {
    console.log(`${newMember.user.username} is now ${newMember.user.presence.status}`);
}