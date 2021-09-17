const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const Discord = require('discord.js');
let embed_color = process.env.EMBED;


const wolfram_alpha_id = process.env.WOLFRAM_ALPHA_APP_ID;

let name = "ask"
module.exports = class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ask',
            aliases: ['search'],
            group: 'search',
            memberName: 'ask',
            description: "Ask Mr.Media anything, and he'll provide an answer from Wolfram|Alpha, an information engine.",
            details: oneLine`
            Ask Mr.Media anything, and he'll provide an answer from Wolfram|Alpha, an information engine.
			`,
            examples: ["ask"]
        });
    }

    async run(msg, args) {
        let text = args;

        if (args.length < 1) {
            msg.reply("Add a question to your command, so I can get an answer for you :eyes:\nEg: `;ask what is the velocity of a Boeing 747`");
        }
        else {

            // Necessary for choosing random colours for rich embeds
            

            let question = text;
            console.log(question)
            let url_encoded_question = question.split(" ").join("%20");

            let ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${url_encoded_question}&output=json`

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    let num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have an answer for that question. Try again maybe?")
                    }
                    else {
                        let interpretation = out.queryresult.pods[0].subpods[0].plaintext;

                        let answer = out.queryresult.pods[1].subpods[0].plaintext;

                        const answerEmbed = new Discord.MessageEmbed()
                        .setColor(embed_color)
                        .setTitle(`${interpretation}`)
                        .setDescription(answer)
                        .setTimestamp()

                        msg.channel.send({
                            embed: answerEmbed
                        });
                    }
                })
                .catch(err => { throw err });

        }
        

    }
};