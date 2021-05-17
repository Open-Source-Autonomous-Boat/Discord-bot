const commando = require('discord.js-commando');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;
var announce_channel = process.env.ANNOUNCE_CHANNEL
const Discord = require('discord.js');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');


module.exports = class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'announce',
      aliases: [],
      memberName: 'announce',
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
    var user_id = message.author.id;
    var user_tag = message.author.tag;

    const extractNumber = /\d+/g;
    
    const if_has_ac = db.has('announcment');
    
    if (if_has_ac === true) {
        db.delete('announcment');
        
        db.set('announcment', reason);
  
      }
    else {
        db.set('announcment', reason);
    }
    
    
    

      message.client.channels.cache.get(announce_channel).send(reason);
      
        const announceMsg = new Discord.MessageEmbed()
          .addField(' 🔔 **New Announcment was posted!**', `Posted by: <@${message.author.id}>`)
          .addField('Message', reason)
          .setTimestamp()
          .setColor(embed_color);
    
    message.reply({ embed: announceMsg })
      
     
  }
};