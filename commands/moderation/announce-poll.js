const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const oneLine = require('common-tags').oneLine;
var embed_color = process.env.EMBED;


module.exports = class VoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce-poll',
            group: 'moderation',
          aliases: [], 
            memberName: 'announce-poll',
            description: "Starts a yes/no/neutral vote.",
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ["MANAGE_MESSAGES"],
            examples: ['announce-poll"'],
            args: [
                {
                    key: 'question',
                    prompt: 'What is the vote question?',
                    type: 'string',
                    validate: question => {
                        if (question.length < 1001 && question.length > 2) return true;
                        return 'Polling questions must be between 1 and 1000 characters in length.';
                    }
                },
                {
                    key: 'desc',
                    prompt: 'Do you have more details?',
                    type: 'string',
                    
                    validate: desc => {
                        if (desc.length < 1001 && desc.length > 2) return true;
                        return 'Polling questions must be between 1 and 1000 characters in length.';
                    }
                },
              {
                key: 'channel_id',
                prompt: "Provide the channel ID",
                type: 'string'
              }
                
            ]
        });
    }
    
    run(message, { question, desc, channel_id}) {
        let embed = new MessageEmbed()
            .setThumbnail(message.client.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTitle(question)
            .setDescription(desc)
            .setAuthor(message.author.tag, message.author.avatarURL({ format: 'png', dynamic: true }))
            .setColor(embed_color)
            .setTimestamp();
            
            embed.setFooter(`Beyond Voting`)
            
        message.delete();
        
      
  
      
        message.client.channels.cache.get(channel_id).send(embed).then(embedMessage => {
    embedMessage.react('👍')
    embedMessage.react('👎')
    embedMessage.react('🤷')
            .catch(console.error);
          
          message.channel.send()
    })
   }
};