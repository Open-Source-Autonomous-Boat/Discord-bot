const commando = require('discord.js-commando');
const Discord = require('discord.js');
var embed_color = process.env.EMBED;

module.exports = class AvatarCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['profile-picture', 'profile-pic', 'pfp', 'av'],
			group: 'meta',
			memberName: 'avatar',
			description: 'Responds with a user\'s avatar.',
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to get the avatar of?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	run(msg, { user }) {
		const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
		
    
    const embed = new Discord.MessageEmbed()
    .setColor(embed_color)
    .setTitle(`${user} avatar`)
    .setImage(user.displayAvatarURL({ format, size: 2048 }))
    .setTimestamp()
    
    msg.channel.send(embed)
	}
};