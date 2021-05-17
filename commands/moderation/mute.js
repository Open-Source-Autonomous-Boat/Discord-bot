const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;


module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      aliases: ['mute-user'],
      memberName: 'mute',
      group: 'moderation',
      description:
        'Mutes a tagged user (if you have already created a Muted role)',
      guildOnly: true,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES'],
      args: [
        {
          key: 'userToMute',
          prompt:
            'Please mention the user you want to mute with @ or provide their ID \n.',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to mute this user? \n',
          type: 'string',
          default: 'no reason'
        }
      ]
    });
  }

  async run(message, { userToMute, reason }) {
    const mutedRole = message.guild.roles.cache.find(
      role => role.name === 'Muted'
    );
    if (mutedRole == null)
      return message.channel.send(
        '<:atlanta_error:736144198318686278> No "Muted" role found, create one and try again.'
      );

    const extractNumber = /\d+/g;

    if (userToMute.match(extractNumber) == undefined)
      return message.channel.send('❌ Please try again with a valid user.');

    const userToMuteID = userToMute.match(extractNumber)[0];
    const user =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(userToMuteID));
    if (user == undefined)
      return message.channel.send('❌ Please try again with a valid user.');
    
    const kickembed = new Discord.MessageEmbed()
      .setColor(embed_color)
      .setTitle('❌ `I can not interact with that user. Please check my and theirs permission!`')
      .setTimestamp()
      
      const kickembed2 = new Discord.MessageEmbed()
      .setColor(embed_color)
      .setTitle('❌ `I can not interact with that user. I need premission MANAGE_ROLES.`')
      
      if (message.guild.member(user).hasPermission('ADMINISTRATOR')) return message.reply({ embed: kickembed});
      if (message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply({ embed: kickembed});
      if (message.guild.member(user).hasPermission('KICK_MEMBERS')) return message.reply({ embed: kickembed});
		if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply({ embed: kickembed2});

    user.roles
      .add(mutedRole)
      .then(() => {
      
      user.send(`You have been muted in: ${message.guild.name} ! For: ${reason}`)
      
        const muteEmbed = new Discord.MessageEmbed()
          .addField('🤐 Muted:', userToMute)
          .addField('Reason', reason)
          .addField('Moderator', `<@${message.author.id}>`)
          .setTimestamp()
          .setColor(embed_color);
        message.channel.send(muteEmbed);
      
      message.client.channels.cache.get(log_channel).send({ embed: muteEmbed});
      })
      .catch(err => {
        message.say(
          '❌ Something went wrong when trying to mute this user.'
        );
        return console.error(err);
      });
  }
};