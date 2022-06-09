
// === .env import === //
const envImports = require('./constants/env-imports');

// SOCIAL MEDIA NPM OBJECTS
const instaClient = require('./npm-objects/insta-npm');
const twitterclient = require('./npm-objects/twitter-npm');

// OTHER NPM MODULES
const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');
const fetch = require('make-fetch-happen')
// const commando = require("discord.js-commando");
const http = require('http');
const Discord = require('discord.js');
const path = require("path");
const oneLine = require("common-tags").oneLine;
const sqlite = require("sqlite");
// sqlite.open("./database.sqlite3");

// === ANTI SPAM === //
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 4, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 7, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 11, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 15, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 4000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 3, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 5, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 10, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: false, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [''], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
});

const client = require('./bot-client/client');

let bot_prefix = "!";
// ==== READY EVENT ==== ///
client.on("ready", require('./bot-client/bot-events/bot-ready'));

// Command specific event listeners that come with the Commando module
client.on("messageCreate", require('./bot-client/bot-events/bot-message'));
 
//Automod and autoresponse

client.on("message", (message) => {
  if (message.author.bot) return;
  
  let bad_words = [ 'dick', 'Dick', 'arrogant', 'Bitch', 'bitch', 'Arrogant', 'cock', 'Cock', 'Nigger', 'nigger', 'niger', 'Niger' ]
  let bad_links = [ 'grabify', 'solarwinds', 'iplogger'  ]
  let nsfw = [ 'porn', 'Porn']
  
  //Bad Words
  
  let foundInText = false;
  for (let i in bad_words) {
    if(message.content.toLowerCase().includes(bad_words[i].toLowerCase())) foundInText = true;
  }

if(foundInText) {
  message.delete();
  message.channel.send(` <@!${message.author.id}> **Thats not nice to say!**`)
}
  
  // LINKS
  
  let uoundInText = false;
  for (let i in bad_links) {
    if(message.content.toLowerCase().includes(bad_links[i].toLowerCase())) uoundInText = true;
  }

  if(uoundInText) {
    message.delete();
    message.channel.send(` <@!${message.author.id}> **That kind of link is restricted!**`)
  }

  //NSFW
  
  let doundInText = false;
  for (let i in nsfw) {
    if(message.content.toLowerCase().includes(nsfw[i].toLowerCase())) doundInText = true;
  }

  if(doundInText) {
    message.delete();
    message.channel.send(` <@!${message.author.id}> **No NSFW!**`)
  }
  
  //OTHER
  
  
  
      
  if (message.content.includes("!d bump")) {
    let responseString = `I will remind you to bump again in 2 hours! <@!${message.author.id}>`;
    message.channel.send(responseString);
    setTimeout(() => {
      message.channel.send(`<@!${message.author.id}> 🕒 2 hours have passed, bump the server again!`);
    }, 7200000);
  }
});

// ========= ANTI SPAM ========== //
client.on('messageCreate', (message) => antiSpam.message(message)); 

antiSpam.on("warnAdd", (member) => {
  const warnEmbed = new Discord.MessageEmbed()
    .setTitle('⚠️ Warned:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: warnEmbed})
});
antiSpam.on("muteAdd", (member) => {
  const muteEmbed = new Discord.MessageEmbed()
    .setTitle('🔇 Muted:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
    .setDescription('They went a bit too far!')
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: muteEmbed})
});
antiSpam.on("kickAdd", (member) => {
  const kickEmbed = new Discord.MessageEmbed()
    .setTitle('🥾 Kicked:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
    .setDescription('They went too far with it!')
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: kickEmbed})
});
antiSpam.on("banAdd", (member) => {
  const banEmbed = new Discord.MessageEmbed()
    .setTitle('🔨 Banned:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
    .setDescription('They went too too far with it!')
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: banEmbed})
});
// ========= LOGS ========== // 

//Join log
client.on("guildMemberAdd", member => {
  member.send('Hello and welcome to **Beyond Earth** please read [the rules](https://discord.com/channels/625476486912016394/829005760359825429/862326002565644318) and verify! Thanks!')
  client.channels.cache.get(envImports.CHANNEL_ID).send(`${member} | ${member.user.tag} just **joined** OSAB`);
});

// Leave log
client.on("guildMemberRemove", member => {
  client.channels.cache.get(envImports.CHANNEL_ID).send(`${member} | ${member.user.tag} just **left** OSAB`)
});

// ===== MORE LOGS ===== //

client.on("guildBanAdd", (guild, user) => {
  const banEmbed = new Discord.MessageEmbed()
    .addField('🔨 Banned:', user)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: banEmbed})
});

client.on("guildBanRemove", (guild, user) => {
  const unbanEmbed = new Discord.MessageEmbed()
    .addField('Unbanned:', user)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: unbanEmbed})
});

client.on("roleCreate", (role) => {
  const roleEmbed = new Discord.MessageEmbed()
    .addField('Role created:', role)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: roleEmbed})
});

client.on("roleDelete", (role) => {
  const roleEmbed = new Discord.MessageEmbed()
    .addField('Role deleted:', role)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: roleEmbed})
});

client.on("emojiCreate", (emoji) => {
  const emojiEmbed = new Discord.MessageEmbed()
    .addField('New emoji:', emoji)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: emojiEmbed})
});

client.on("emojiDelete", (emoji) => {
  const emojiEmbed = new Discord.MessageEmbed()
    .addField('Deleted emoji:', emoji)
    .setColor(envImports.EMBED_COLOR);
  client.channels.cache.get(envImports.CHANNEL_ID).send({embed: emojiEmbed})
});

// === Finishing part === //
// client
//   .setProvider(
//     sqlite
//       .open(path.join(__dirname, "database.sqlite3"))
//       .then(db => new commando.SQLiteProvider(db))
//   )
//   .catch(console.error);

// client.registry
//   .registerDefaultTypes()
//   .registerGroups([
//     ["util", "Util"],
//     [
//       "media",
//       "Media commands: Search for stickers & GIFs, make memes, make qr codes/captchas, etc.,"
//     ],
//     [
//       "fun",
//       "Fun commands: All sorts of entertaining commands can be found here. "
//     ],
//     [
//       "search",
//       "Search commands: Search YouTube, ask Mr.Media questions, get answers to anything, get data, definitions, etc.,"
//     ],
    
//     [
//       "social",
//       "Social commands: Get avatars, wave and poke people. More on the way."
//     ],
//     [
//       "space",
//       "Space commands: Get live NASA footage, ISS coordinates, and space imagery."
//     ],
//     [
//       "meta",
//       "Meta commands: Get info about your server, about Mr.Space, who coded him, etc.,"
//     ],
//     [
//       "moderation",
//       "moderation commands to ban/kick users"
//     ],
//     [
//       "economy",
//       "economy commands"
//     ]
//   ])
//   .registerDefaultGroups()
//   .registerDefaultCommands({ help: false })
//   .registerCommandsIn(path.join(__dirname, "commands"));

// ==== client login ==== //
client.login(envImports.TOKEN);