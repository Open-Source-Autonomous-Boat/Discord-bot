
// === .env import === //
let token = process.env.TOKEN;
let embed_color = process.env.EMBED;
const nasa_api = process.env.NASA_API;
let API_KEY = process.env.API_KEY;
let API_KEY_SECRET = process.env.API_KEY_SECRET;
let ACCES_TOKEN = process.env.ACCES_TOKEN;
let ACCES_SECRET = process.env.ACCES_SECRET;
let username = process.env.INSTA_USER;
let password = process.env.INSTA_PASS;
let owner_discord_id = process.env.OWNER_DISCORD_ID;
let channel_id = process.env.LOGGING_CHANNEL_ID;
let status_id = process.env.BOT_STATUS_CHANNEL;
let general_chat = process.env.GENERAL_CHAT;    

// === TWITTER NPM === //
const twitter = require('twitter-lite');
const twitterclient = new twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: API_KEY, // from Twitter.
  consumer_secret: API_KEY_SECRET, // from Twitter.
  access_token_key: ACCES_TOKEN, // from your User (oauth_token)
  access_token_secret: ACCES_SECRET // from your User (oauth_token_secret)
});
// === INSTAGRAM NPM === //
const Instagram = require('instagram-web-api')
const instaClient = new Instagram({ username, password })


// OTHER NPM MODULES

const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');
const fetch = require('node-fetch')
const commando = require("discord.js-commando");
const http = require('http');
const Discord = require('discord.js');
const path = require("path");
const oneLine = require("common-tags").oneLine;
const sqlite = require("sqlite");
sqlite.open("./database.sqlite3");
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

const client = new commando.Client({
  owner: owner_discord_id,
  commandPrefix: "!",
  disableEveryone: true,
  unknownCommandResponse: false
});

let bot_prefix = "!";
// ==== READY EVENT ==== ///
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`); 
  
  const if_has_txt = db.has('status_txt');
    const if_has_type = db.has('status_type');
    
    if (if_has_txt === true) {
      if (if_has_type === true){
  
  const status_text = db.get('status_txt');
  const status_type = db.get('status_type');
  
  client.user.setActivity(status_text,{ type: status_type})
      }
    } else {
        client.user.setActivity('https://osab.xyz/',{ type: 'WATCHING'})

    }
  // === clock === //
  setInterval(function() {
    
    let d = new Date(); // for now
let hour = d.getHours(); // => 9
let minute = d.getMinutes(); // =>  30
    
    const time = hour + ":" + minute 
    console.log(time)
    
  //clock to do timed events
    
    },  60 * 1000); // checks time every minute
  
  // end of ready event
  });

// Error handling
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log);

// Bot status
client
  .on("reconnecting", () => {
    console.warn("Bot is reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! Bot has disconnected!");
  });

// Command specific event listeners that come with the Commando module
client
  .on("commandError", (cmd, err) => {
    console.log("command error");
    if (err instanceof commando.FriendlyError) return;
    let message = `Error in command ${cmd.groupID}:${cmd.memberName}, ${err}`;
     console.log(` ${message}`);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
    msg.reply("Command has been blocked.");
  })
  .on("commandPrefixChange", async (guild, prefix) => {
    let message = `Prefix ${
      prefix === "" ? "removed" : `changed to ${prefix || "the default"}`
    } ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.`;
    client.channels.cache.get(channel_id).send(` ${message}`);

    console.log(`PREFIX CHANGE: ${prefix}`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {

    let message = `Command ${command.groupID}:${command.memberName} ${
      enabled ? "enabled" : "disabled"
    } ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.`;
    console.log(`  ${message}`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("message", async msg => {

    let commands = ["nick", "apod", "hug", "astroall", "wave", "ask", "photo", "img", "define", "emoji", "name", "gif", "meme", "meme_templates",
                     "neo", "earth", "iss", "astronauts", "cats", "ascii-faces", "captcha", 
     "wave", "poke", "info", "invite", "pop", "donate"];

    if (msg.author.bot) return;
       let guild_id = msg.channel.guild.id;
       let prefix;
    let message = "Message";

    if (msg.channel.type === "dm") {
      console.log(`${msg.content}`);
    }

    if (msg.content.split(" ")[0] === "-" || msg.content.split("")[0] === "-") {
      let cmd_name = msg.content.split(" ")[0].substring(1, msg.content.length);
      console.log("cmd name", cmd_name[0]);
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

    } else if (msg.mentions.has(client.user) && (msg.content.indexOf("@everyone") == -1) && (msg.content.indexOf("@here") == -1)) {
      if (msg.content.length === 21) {
        // Just Beyond was mentioned and no other text accompanied it
        const pongEmbed = new Discord.MessageEmbed()
            .setColor('34deeb') 
            .setTitle('**How to use me?**')
            .setDescription(`My prefix is **${bot_prefix}** \n\nYou can use **${bot_prefix}help** to get a list of my commands. \n\n For any aditional info on command or how to use it type  **${bot_prefix}help <command>** `)
            .setTimestamp()
        
        msg.channel.send({ embed: pongEmbed})
          }
      
      message = `**Message:** ${msg.content} \n**Timestamp:** ${msg.createdTimestamp} \n**Date:** ${msg.createdAt} \nServer Count: ${
        msg.guild.memberCount} \n**Region:** ${msg.guild.region} \n**Server Name:** ${msg.guild.name} \n**Server ID:** ${msg.guild.id} \n**User:** ${msg.author.tag} `;
      console.log(message);
      console.log(msg.content.length);
      try {
        console.log(`${message}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  });
 
//Automod and autoresponse

client.on("message", function(message) {
    if (message.author.bot) {
        return;
    }
  
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
          
  client.on('message', (message) => antiSpam.message(message)); 

antiSpam.on("warnAdd", (member) => {
  const banEmbed = new Discord.MessageEmbed()
          .setTitle('⚠️ Warned:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});
antiSpam.on("muteAdd", (member) => {
  const banEmbed = new Discord.MessageEmbed()
          .setTitle('🔇 Muted:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
          .setDescription('They went a bit too far!')
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});
antiSpam.on("kickAdd", (member) => {
  const banEmbed = new Discord.MessageEmbed()
          .setTitle('🥾 Kicked:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
          .setDescription('They went too far with it!')
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});
antiSpam.on("banAdd", (member) => {
  const banEmbed = new Discord.MessageEmbed()
          .setTitle('🔨 Banned:' + ' ' + member.user.tag + ' ' + 'for spamming!' )
          .setDescription('They went too too far with it!')
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});
// ========= LOGS ========== // 

//Join log

client.on("guildMemberAdd", member => {
  
  member.send('Hello and welcome to **Beyond Earth** please read <#758766642666405888> and verify! Thanks!')
   
  client.channels.cache.get(channel_id).send(`${member} | ${member.user.tag} just **joined** OSAB`)

});

// Leave log
client.on("guildMemberRemove", member => {
  
   client.channels.cache.get(channel_id).send(`${member} | ${member.user.tag} just **left** OSAB`)
   
});

// ===== MORE LOGS ===== //

client.on("guildBanAdd", function(guild, user){
  const banEmbed = new Discord.MessageEmbed()
          .addField('🔨 Banned:', user)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

client.on("guildBanRemove", function(guild, user){
  const banEmbed = new Discord.MessageEmbed()
          .addField('Unbanned:', user)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

client.on("roleCreate", function(role){
    const banEmbed = new Discord.MessageEmbed()
          .addField('Role created:', role)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

client.on("roleDelete", function(role){
    const banEmbed = new Discord.MessageEmbed()
          .addField('Role deleted:', role)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

client.on("emojiCreate", function(emoji){
    const banEmbed = new Discord.MessageEmbed()
          .addField('New emoji:', emoji)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

client.on("emojiDelete", function(emoji){
    const banEmbed = new Discord.MessageEmbed()
          .addField('Deleted emoji:', emoji)
          .setColor(embed_color);
      client.channels.cache.get(channel_id).send({embed: banEmbed})
});

// === Finishing part === //
client
  .setProvider(
    sqlite
      .open(path.join(__dirname, "database.sqlite3"))
      .then(db => new commando.SQLiteProvider(db))
  )
  .catch(console.error);

client.registry
  .registerDefaultTypes()

  .registerGroups([
    ["util", "Util"],
    [
      "media",
      "Media commands: Search for stickers & GIFs, make memes, make qr codes/captchas, etc.,"
    ],
    [
      "fun",
      "Fun commands: All sorts of entertaining commands can be found here. "
    ],
    [
      "search",
      "Search commands: Search YouTube, ask Mr.Media questions, get answers to anything, get data, definitions, etc.,"
    ],
    
    [
      "social",
      "Social commands: Get avatars, wave and poke people. More on the way."
    ],
    [
      "space",
      "Space commands: Get live NASA footage, ISS coordinates, and space imagery."
    ],
    [
      "meta",
      "Meta commands: Get info about your server, about Mr.Space, who coded him, etc.,"
    ],
  [
    "moderation",
    "moderation commands to ban/kick users"
  ],
  
  [
    "economy",
    "economy commands"
  ]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));

// ==== client login ==== //
client.login(token);
