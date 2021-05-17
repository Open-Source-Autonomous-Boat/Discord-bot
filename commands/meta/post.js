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

var name = "post"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'post',
            aliases: [],
            group: 'meta',
            memberName: 'post',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            description: "Get a message vith virtual buble wrap, amd enjoy poping each bubble! ",
            details: "Get a message vith virtual buble wrap, amd enjoy poping each bubble! ",
            examples: ["restart"],
          args: [
        {
          key: 'text',
          prompt:
            'Text to post on socila media, keep it short! \n',
          type: 'string'
        },
            {
          key: 'img_link',
          prompt:
            'Image link to post? (jpg or jpeg)\n',
          type: 'string'
        }
            ]

        });
    }

     async run(msg, { text, img_link }) { 
       const photo = img_link;
       
      const  the_text = truncate(text, 275);
       
       // ====== INSTAGRAM ======= //
       await instaClient.login()
  // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
  const { media } = await instaClient.uploadPhoto({ photo: photo, caption: text, post: 'feed' })
  console.log(`https://www.instagram.com/p/${media.code}/`)
       
       const embed_insta = new Discord.MessageEmbed()
         .setColor(embed_color)
         .setTitle('**New Instagram post**')
         .addField('Content:', text)
         .addField('Post:', `https://www.instagram.com/p/${media.code}/`)
         .setImage(photo)
  msg.channel.send(embed_insta)
       
       // ======= TWITTER ======= //
       
       client.post('statuses/update', { status: the_text }).then(result => {
         const embed = new Discord.MessageEmbed()
         .setColor(embed_color)
         .setTitle('**New Tweet**')
         .addField('Content:', the_text)
  msg.channel.send(embed)
}).catch(console.error);
       
    }
    };

