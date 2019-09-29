module.exports = async (bot, oldMember, newMeber) => {
	if(oldMember.voiceChannel != undefined){
		if(oldMember.voiceChannel.parent.id === 589884500834648074 && oldMember.voiceChannel.members.keyArray().length == 0 && oldMember.voiceChannel.id != 589884737666023447){
			oldMember.voiceChannel.delete();
		}
	}

	if (newMeber.voiceChannel != undefined){
		if(newMeber.voiceChannel.id == 589884737666023447){
			server = newMeber.guild;
			let ch = server.createChannel(newMeber.user.username,{
				type: 'voice',
				permissionOverwrites: [{
					id: server.defaultRole.id,
					deny: ['VIEW_CHANNEL'],
				}],
			}).then(ch => {
				ch.setParent(589884500834648074)
				ch.replacePermissionOverwrites({
					overwrites: [{
						id: server.defaultRole.id,
						allow: ['VIEW_CHANNEL'],
					}, {
						id: newMeber.user.id,
						allow: ['VIEW_CHANNEL','MANAGE_CHANNELS','DEAFEN_MEMBERS','MOVE_MEMBERS']
					}]
				});
				newMeber.setVoiceChannel(ch.id)
			})
		}
	}
}