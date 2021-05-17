const { Command } = require('discord.js-commando');
var embed_color = process.env.EMBED;
const Discord = require('discord.js');
var log_channel = process.env.LOGGING_CHANNEL_ID;

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dm',
      aliases: [],
      memberName: 'dm',
      group: 'moderation',
      description:
        'Dm a member!',
      guildOnly: true,
      userPermissions: ['BAN_MEMBERS'],
      clientPermissions: ['MANAGE_ROLES'],
      cooldown: 15000,
      args: [
        {
          key: 'userToMute',
          prompt:
            'Please mention the user you want to DM with @ or provide their ID \n.',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'What do you want the message to say? \n',
          type: 'string'
          
        }
      ]
    });
  }

  async run(message, { userToMute, reason }) {
    
    

    const extractNumber = /\d+/g;

    if (userToMute.match(extractNumber) == undefined)
      return message.channel.send('❌ Please try again with a valid user.');

    const userToMuteID = userToMute.match(extractNumber)[0];
    const user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(userToMuteID));
    if (user == undefined)
      return message.channel.send('❌ Please try again with a valid user.');
  
      
      const kickembed2 = new Discord.MessageEmbed()
      .setColor('ff0000')
      .setTitle('❌ `I can not interact with that user. I need premission MANAGE_ROLES.`')

      if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply({ embed: kickembed2});
      
    
    user.send(`${reason} \n\n Use **;mail <your message>** to reply! \n- Sincerely the **OSAB** Team`).then(() => {
    

    
    
    
        const muteEmbed = new Discord.MessageEmbed()
          .addField('📝 DMed:', userToMute)
          .addField('Message', reason)
          .addField('Moderator', `<@${message.author.id}> | ${message.author.tag}`)
          .setTimestamp()
          .setColor(embed_color);
        message.channel.send(muteEmbed);
      
    });
  }
};