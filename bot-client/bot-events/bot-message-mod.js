const { Message, MessageEmbed } = require('discord.js');
const envImports = require('../../constants/env-imports');

const badWords = [ 'dick', 'arrogant', 'bitch', 'cock', 'nigger', 'nigga' ];
const badLinks = [ 'grabify', 'solarwinds', 'iplogger' ];
const nsfw = [ 'porn', 'cum' ];

/**
 * @param {Message} message
 */
const logDeletedWords = (message, bannedWord) => {
  const logEmbed = new MessageEmbed()
    .setColor('34deeb')
    .setTitle('**Message Deleted**')
    .setAuthor({
      name: message.author.tag,
      iconURL: message.author.avatarURL()
    })
    .addFields(
      { name: "Banned Word", value: bannedWord },
      { name: "Message", value: message.content },
      { name: "Channel", value: `<#${message.channel.id}>` }
    )
  message.client.channels.fetch(envImports.CHANNEL_ID)
    .then(channel => channel.send({ embeds: [logEmbed] }));
}

/**
 * @param {Message} message
 */
module.exports = async message => {
  if (message.author.bot) return;
  const loweredMsg = message.content.toLowerCase();

  //Bad Words
  for (let i in badWords) {
    if (loweredMsg.includes(badWords[i])) {
      message.delete();
      message.channel.send(`<@!${message.author.id}> **Thats not nice to say!**`);
      logDeletedWords(message, badWords[i]);
      break;
    };
  }

  // Links
  for (let i in badLinks) {
    if (loweredMsg.includes(badLinks[i])) {
      message.delete();
      message.channel.send(`<@!${message.author.id}> **That kind of link is restricted!**`);
      logDeletedWords(message, badLinks[i]);
      break;
    };
  }

  //NSFW
  for (let i in nsfw) {
    if (loweredMsg.includes(nsfw[i])) {
      message.delete();
      message.channel.send(`<@!${message.author.id}> **No NSFW!**`);
      logDeletedWords(message, nsfw[i]);
      break;
    };
  }

  // ===== Commented out because Disboard does not take regular commands anymore ===== //
  // //OTHER
  // if (message.content.includes("!d bump")) {
  //   message.channel.send(`I will remind you to bump again in 2 hours! <@!${message.author.id}>`);
  //   setTimeout(() => {
  //     message.channel.send(`<@!${message.author.id}> 🕒 2 hours have passed, bump the server again!`);
  //   }, 7200000);
  // }
}