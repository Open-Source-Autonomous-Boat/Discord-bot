const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      aliases: ['unmute-user'],
      memberName: 'unmute',
      group: 'moderation',
      description:
        'Unmutes a tagged user (if you have already created a Muted role)',
      guildOnly: true,
      userPermissions: ['MANAGE_ROLES'],
      clientPermissions: ['MANAGE_ROLES'],
      args: [
        {
          key: 'userToMute',
          prompt:
            'Please mention the user you want to unmute with @ or provide their ID \n.',
          type: 'string'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to unmute this user? \n',
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
        '❌ No "Muted" role found, create one and try again.'
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
      
      if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply({ embed: kickembed2});

    user.roles
      .remove(mutedRole)
      .then(() => {
      
      user.send(`You have been unmuted in: ${message.guild.name} `)
      
        const muteEmbed = new Discord.MessageEmbed()
          .addField('😀 Unmuted:', userToMute)
          .addField('Reason', reason)
          .addField('Moderator', `<@${message.author.id}>`)
          .setTimestamp()
          .setColor(embed_color);
        message.channel.send(muteEmbed);
      
      message.client.channels.cache.get(log_channel).send({ embed: muteEmbed});
      })
      .catch(err => {
        message.say(
          '❌ Something went wrong when trying to unmute this user.'
        );
        return console.error(err);
      });
  }
};