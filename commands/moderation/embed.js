const commando = require('discord.js-commando');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;
const Discord = require('discord.js');



module.exports = class MuteCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'embed',
      aliases: [],
      memberName: 'embed',
      group: 'moderation',
      description:
        'Make an embed!',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      cooldown: 15000,
      args: [ 
        {
          key: 'title',
          prompt: 'What is the title of your embed?',
          type: 'string'
        },
        {
          key: 'description',
          prompt: 'What is the description of your embed?',
          type: 'string'
        },
        {
          key: 'image',
          prompt: 'Wanna include an image? For imgage please provide its URL from image hosting site. Make sure url has ending .jpg or such formats. \n',
          type: 'string'
          
        },
        {
          key: 'channel',
          prompt: 'Where should I send this? Enter channel ID. \n',
          type: 'string'
          
        }
      ]
    });
  }

  async run(message, { title, description, image, channel }) {
    
    
      const embed = new Discord.MessageEmbed()
       .setColor(embed_color)
      .setTitle(title)
      .setDescription(description)
      .setImage(image)
      .setTimestamp()
      
      
      const log_embed = new Discord.MessageEmbed()
       .setColor(embed_color)
      .setTitle('🖊️ **Made a new embed**')
      .setDescription(`Posted in ${channel}   |    by ${message.author.tag}`)
      .setTimestamp()
      
     
      message.client.channels.cache.get(channel).send({ embed: embed});
    message.reply(log_embed)
    
  }
};