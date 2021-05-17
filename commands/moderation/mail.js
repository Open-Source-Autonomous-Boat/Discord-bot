const commando = require('discord.js-commando');
var embed_color = process.env.EMBED;
var mail_channel = process.env.MAIL_CHANNEL
const Discord = require('discord.js');



module.exports = class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'mail',
      aliases: [],
      memberName: 'mail',
      group: 'moderation',
      description:
        'Mail a staff team!',
      guildOnly: false,
      
      cooldown: 15000,
      args: [
        
        {
          key: 'reason',
          prompt: 'What do you want the message to say? \n',
          type: 'string'
          
        }
      ]
    });
  }

  async run(message, { reason }) {
    var user_id = message.author.id;
    var user_tag = message.author.tag;
    var user = message.author;

    const extractNumber = /\d+/g;
    
    const mailEmbed = new Discord.MessageEmbed()
    .setColor(embed_color)
    .setTitle('📬 **New Mail!**')
    .addField('**Message Content**', reason)
    .addField('**Sender**', `<@${user_id}> | ${user_tag} | ${user_id}`)
    .setTimestamp()

      message.client.channels.cache.get(mail_channel).send({ embed: mailEmbed });
      
        const muteEmbed = new Discord.MessageEmbed()
          .addField('📮 **Your Mail was sent sucessfuly!**', 'Our staff team will send you a DM as soon as they see your message!')
          .addField('**Message**', reason)
          .setTimestamp()
          .setFooter('- Sincerely the Beyond Earth team! ')
          .setColor(embed_color);
          
        user.send(muteEmbed);
      
    message.delete();
     
  }
};