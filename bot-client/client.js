const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS
  ]
});

// Error handling
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log);

// Bot status
client
  .on("reconnecting", () => console.warn("Bot is reconnecting..."))
  .on("disconnect", () => console.warn("Warning! Bot has disconnected!"));

module.exports = client;