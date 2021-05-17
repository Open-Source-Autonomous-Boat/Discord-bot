const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: [],
      memberName: 'kick',
      group: 'moderation',
      description: 'Kicks a tagged member',
      guildOnly: true,
      cooldown: 15000,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Please mention the user you want to kick with @ or provide his ID \n',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to kick this user \n',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    var sender = message.author.id;
    const user =
      message.mentions.members.first() ||
      message.guild.members.fetch(userToBan);
    if (user == undefined)
      return message.channel.send('❌ Please try again with a valid user');
    
    const kickembed = new Discord.MessageEmbed()
      .setColor(embed_color)
      .setTitle('❌ `I can not interact with that user. Please check my and theirs permission!`')
      .setTimestamp()
      
      const kickembed2 = new Discord.MessageEmbed()
      .setColor(embed_color)
      .setTitle('❌ `I can not interact with that user. I need premission KICK_MEMBERS.`')
      
      if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply({ embed: kickembed});
      if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply({ embed: kickembed});
      if (message.guild.member(user).hasPermission('KICK_MEMBERS')) return message.reply({ embed: kickembed});
		if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply({ embed: kickembed2});

    
    user.send(`You have been kicked form: ${message.guild.name} ! For: ${reason} `)
    user
      .kick(reason)
      .then(() => {
        const banEmbed = new Discord.MessageEmbed()
          .addField('👢 Kicked:', userToBan)
          .addField('Reason', reason)
          .addField('Moderator', `<@${sender}>`)
          .setColor(embed_color);
      
        message.channel.send(banEmbed);
      
      
      })
      .catch(e => {
        message.say(
          '❌ Something went wrong when trying to kick this user, I probably do not have the permission to kick him'
        );
        return console.error(e);
      });
  }
};