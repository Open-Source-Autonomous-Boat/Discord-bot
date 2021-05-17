const commando = require('discord.js-commando');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;
var announce_channel = process.env.ANNOUNCE_CHANNEL
const Discord = require('discord.js');



module.exports = class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: [],
      memberName: 'say',
      group: 'moderation',
      description:
        'Announce stuff!',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      cooldown: 15000,
      args: [ 

        
        {
          key: 'reason',
          prompt: 'What do you want the message to say? (Please be sure you have the message written so you just copy paste it. And look out for **Capital** leter at the begging of message! ) \n',
          type: 'string'
          
        }
        
      ]
    });
  }

  async run(message, { reason }) {

    
    message.channel.send(reason);
    message.delete();

      
      
        
      
     
  }
};