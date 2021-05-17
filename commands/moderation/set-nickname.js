const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;


module.exports = class NicknameCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'nickname',
      aliases: ['nick', 'n'],
      group: 'moderation',
      memberName: 'nickname',
      description: 'Nicknames the selected member with the provided nickname',
      examples: ['nickname @Sirius New Nick'],
      clientPermissions: ['MANAGE_NICKNAMES'],
      userPermissions: ['MANAGE_NICKNAMES'],
      guildOnly: true,
      args: [
        {
            key: 'member',
            prompt: 'Which member do you want to change the nickname of?',
            type: 'member'
        },
        {
            key: 'nickname',
            prompt: 'What name do you want to change their nickname to?',
            type: 'string'
        }
    ]
    });
  }

  run (msg, { member, nickname }) {
    const oldName = member.displayName;
    const nicknameEmbed = new MessageEmbed();

    member.setNickname(nickname);

    nicknameEmbed
      .setColor(embed_color)
      .setTitle('🖋️ Nickname Changed!' )
      .addField(`Member`, `<@${member.id}> |  ${member.user.tag}`)
      .addField(`Old Name`,`• ${oldName}`)
      .addField(`New Name`,`• ${nickname}`)
      .setFooter(`Moderator: ${msg.author.tag}`, msg.author.avatarURL({ format: 'png', dynamic: true }))
      .setTimestamp();

    if (msg.deletable) {
        msg.delete();
    }

    msg.say(nicknameEmbed);
    msg.client.channels.cache.get(log_channel).send({ embed: nicknameEmbed});
  }
};