const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const Discord = require('discord.js');
var embed_color = process.env.EMBED;

var pixabay_api_key = process.env.PIXABAY_API_KEY;

var name = "img"
module.exports = class PixabayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'img',
            aliases: ['image'],
            group: 'search',
            memberName: 'img',
            description: "Search Pixabay for public domain, stunning images.",
            details: "Search Pixabay for public domain, stunning images.",
            examples: ["img"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Add some search terms to your command, so I know what photos to get you \nEg: ;pixabay night sky");
        }

        else {
            // Necessary for choosing random colours for rich embeds
            

            var search_term = text;
            var url_encoded_search_query = search_term.split(" ").join("%20")
            console.log(search_term)
            var pixabay_link = `https://pixabay.com/api/?key=${pixabay_api_key}&q=${url_encoded_search_query}&image_type=photo`

            fetch(pixabay_link)
                .then(res => res.json())
                .then((out) => {

                    if (out.totalHits === 0) {
                        msg.reply("No matching results found :(")
                    }
                    else {
                        // var half_results_length = Math.floor(out.hits.length / 2)
                        var randomNumber;
                        if (out.totalHits < 10) {
                            randomNumber = getRandomNumber(0, out.totalHits - 1)
                        }
                        else {
                            randomNumber = getRandomNumber(0, 9)
                        }
                        var random_img_link = out.hits[randomNumber].largeImageURL;

                        console.log("result: ", out.hits[randomNumber]);

                        const photoEmbed = new Discord.MessageEmbed()
                        .setColor(embed_color)
                        .setTitle(` Image From Pixabay for: ${search_term}`)
                        .setDescription(`[Original image found here](${out.hits[randomNumber].pageURL}) on [Pixabay](https://pixabay.com)`)
                        .setImage(random_img_link)
                        .setThumbnail(this.client.user.avatarURL)
                        .addFields(
                            { name: 'Original Image', value: `[Original image found here](${out.hits[randomNumber].pageURL})`},
                           )
                        msg.channel.send({
                            embed: photoEmbed
                        });
                    }
                })
                .catch(err => { throw err });

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
