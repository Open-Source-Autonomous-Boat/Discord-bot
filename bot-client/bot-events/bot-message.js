const { Message, MessageEmbed } = require('discord.js');

const bot_prefix = "!";
const commands = [
  "nick", "apod", "hug", "astroall", "wave", "ask", "photo", "img", "define", "emoji", "name",
  "gif", "meme", "meme_templates", "neo", "earth", "iss", "astronauts", "cats", "ascii-faces",
  "captcha", "wave", "poke", "info", "invite", "pop", "donate"
];

const pongEmbed = new MessageEmbed()
  .setColor('34deeb') 
  .setTitle('**How to use me?**')
  .setDescription(`My prefix is **${bot_prefix}** \n\nYou can use **${bot_prefix}help** to get a list of my commands. \n\n For any aditional info on command or how to use it type  **${bot_prefix}help <command>** `)
  .setTimestamp()

/**
 * @param {Message} msg
 */
module.exports = async msg => {
  if (msg.author.bot) return;
  let guild_id = msg.channel.guild.id;
  let prefix;
  let message = "Message";

  if (msg.channel.type === "dm") console.log(`${msg.content}`);

  if (msg.content.startsWith('-')) {
    const cmd_name = msg.content.split(" ")[0].substring(1, msg.content.length);

    if (commands.includes(cmd_name)) {
      // Logging,
      message = `${msg.content} Timestamp: ${
        msg.createdTimestamp
      } Date: ${msg.createdAt}`;
      console.log(message);

      try {
        console.log(`${message}`);
      } catch (error) {
        console.log(error);
      }
    }

  } else if (msg.content.startsWith(`<@${msg.client.user.id}>`)) {
    if (msg.content.length === 21) {
      // Just Beyond was mentioned and no other text accompanied it
      msg.channel.send({ embeds: [pongEmbed] })
    }

    message = `**Message:** ${msg.content}
      **Timestamp:** ${msg.createdTimestamp}
      **Date:** ${msg.createdAt}
      **Server Count**: ${msg.guild.memberCount}
      **Region:** ${msg.guild.region}
      **Server Name:** ${msg.guild.name}
      **Server ID:** ${msg.guild.id}
      **User:** ${msg.author.tag}`;
    console.log(message);
    console.log(msg.content.length);
  } else {
    return;
  }
}