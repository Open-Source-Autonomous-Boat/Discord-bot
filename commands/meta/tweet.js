const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
var truncate = require('truncate');
var embed_color = process.env.EMBED; 
var API_KEY = process.env.API_KEY;
var API_KEY_SECRET = process.env.API_KEY_SECRET;
var ACCES_TOKEN = process.env.ACCES_TOKEN;
var ACCES_SECRET = process.env.ACCES_SECRET;
var username = process.env.INSTA_USER;
var password = process.env.INSTA_PASS;

const twitter = require('twitter-lite');
const Instagram = require('instagram-web-api')
const instaClient = new Instagram({ username, password })

const Discord = require('discord.js');

const client = new twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: API_KEY, // from Twitter.
  consumer_secret: API_KEY_SECRET, // from Twitter.
  access_token_key: ACCES_TOKEN, // from your User (oauth_token)
  access_token_secret: ACCES_SECRET // from your User (oauth_token_secret)
});

var name = "tweet"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'tweet',
            aliases: [],
            group: 'meta',
            memberName: 'tweet',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            description: "Get a message vith virtual buble wrap, amd enjoy poping each bubble! ",
            details: "Get a tweet vith virtual buble wrap, amd enjoy poping each bubble! ",
            examples: ["restart"],
          args: [
        {
          key: 'text',
          prompt:
            'What do you wanna tweet? Keep it short, or I will short it. \n',
          type: 'string'
        }
            
            ]

        });
    }

     async run(msg, { text }) { 
       
      const  the_text = truncate(text, 275);

       // ======= TWITTER ======= //
       
       client.post('statuses/update', { status: the_text }).then(result => {
         const embed = new Discord.MessageEmbed()
         .setColor(embed_color)
         .setTitle('**New Tweet**')
         .addField('Content:', the_text)
         .setTimestamp()
  msg.channel.send(embed)
         
}).catch(console.error);
       
    }
    };

