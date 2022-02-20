const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
let embed_color = process.env.EMBED;
let log_channel = process.env.LOGGING_CHANNEL_ID;

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: [],
      memberName: 'ban',
      group: 'moderation',
      description: 'Bans a tagged member',
      guildOnly: true,
      cooldown: 15000,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Please mention the user you want to ban! \n',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to ban this user \n',
          type: 'string'
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    let sender = message.author.id;
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
      .setTitle('❌ `I can not interact with that user. I need premission BAN_MEMBERS.`')
      
    if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply({ embed: kickembed});
    if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply({ embed: kickembed});
    if (message.guild.member(user).hasPermission('KICK_MEMBERS')) return message.reply({ embed: kickembed});
		if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply({ embed: kickembed2});

    
    user.send(`You have been banned form: ${message.guild.name} ! For: ${reason} ` + 'If you think this was unfair visit our Ban Appeal server: https://discord.gg/7hhgTQyhq6')
    user
      .ban( {reason: reason, days: 7})
      .then(() => {
        const banEmbed = new Discord.MessageEmbed()
          .addField('🔨 Banned:', userToBan)
          .addField('Reason', reason)
          .addField('Moderator', `<@${sender}>`)
          .setColor(embed_color);
      
        message.channel.send(banEmbed);
      
      
      })
      .catch(e => {
        message.say(
          '❌ Something went wrong when trying to ban this user, I probably do not have the permission to kick him'
        );
        return console.error(e);
      });
  }
};