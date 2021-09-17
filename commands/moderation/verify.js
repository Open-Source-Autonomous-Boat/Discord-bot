const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
let embed_color = process.env.EMBED;
let channel_id = process.env.LOGGING_CHANNEL_ID;
let general_chat = process.env.GENERAL_CHAT;


module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'verify',
      aliases: [],
      memberName: 'verify',
      group: 'moderation',
      description: 'Verifies you',
      guildOnly: true,
      clientPermissions: ['MANAGE_ROLES'],
      
    });
  }
  

  async run(message) {
    
    message.delete();
    
    const role = message.guild.roles.cache.find(
      role => role.name === 'Low Earth Orbit'
    );
    

    const user = message.member;
    
    const member = message.author.id;
    const member_tag = message.author.tag;
    
    user.roles
      .add(role)
      .then(() => {
      
      
      
        let messages = [`Hello <@${member}> welcome to **Beyond Earth**! You can go ahead and read <#758766642666405888>, you can also get some roles in <#758766645622865961>, also introduce yourself in <#814203805540679721>! `,
                        `Hey <@${member}> wecome to ther server! You can go ahead and read <#758766642666405888> and don't forget to get some <#758766645622865961>, also introduce yourself in <#814203805540679721>!`
        ]
        let random = Math.floor(Math.random() *  messages.length);


        let randomMessage = messages[random];



        message.client.channels.cache.get(general_chat).send(`${randomMessage}`);

      })
      .catch(err => {
        message.say(
          '❌ Something went wrong when trying to verify.'
        );
        return console.error(err);
      });
  }
};