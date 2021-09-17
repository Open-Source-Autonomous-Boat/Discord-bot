const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require("node-fetch");
const wolfram_alpha_id = process.env.WOLFRAM_ALPHA_APP_ID;
let embed_color = process.env.EMBED;


let name = "define"
module.exports = class DefineCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'define',
            aliases: ['def', 'definition'],
            group: 'search',
            memberName: 'define',
            description: "Get a definition of a word.",
            details: "Get a definition of a word.",
            examples: ["define technology"],
        });
    }

    async run(msg, args) {
        let text = args;
        if (args.length < 1) {
            msg.reply("Add a word(s) to your command, so I know what word(s) you'd like the definition of.\nEg: `;define technology`")
        } else {

            // Necessary for choosing random colours for rich embeds
            
            let search_term = text;
            search_term = "define " + search_term;
            let url_encoded_search_term = search_term.split(" ").join("%20")
            let ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${url_encoded_search_term}&output=json`
            console.log("ask link: ", ask_link);

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    let num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have a definition for that word. Try again maybe?")
                    }
                    else {
                        let interpretation = out.queryresult.pods[0].subpods[0].plaintext;

                        let answer = out.queryresult.pods[1].subpods[0].plaintext;


                        msg.channel.send({
                            embed: {
                                color: embed_color,
                                title: `${interpretation}`,
                                description: answer
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }

        
    }
};