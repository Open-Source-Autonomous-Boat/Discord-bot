const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
var embed_color = process.env.EMBED;

var name = "restart"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            aliases: [],
            group: 'meta',
            memberName: 'restart',
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            description: "Get a message vith virtual buble wrap, amd enjoy poping each bubble! ",
            details: "Get a message vith virtual buble wrap, amd enjoy poping each bubble! ",
            examples: ["restart"]

        });
    }

     async run(msg) {
       console.log('Restarting...')
       msg.reply('Restaring...')
        process.exit();
        
    }
    };

