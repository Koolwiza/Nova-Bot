const Discord = require('discord.js')
const colors = require('../colors.json')
const { stripIndents } = require("common-tags");
const urban = require('urban');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'urban',
    description: 'Urban dictionary',
    usage: 'urban <word>',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args) {
        if (!args[0]) return message.channel.send('Enter a word to search for.');

        const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxeXc6CDMTuda_avVhbE95cPJ2QMoKLxNbHR5pvyUoB0a_y-fl';

        let msg = args.slice(0).join(' ');

        let search = urban(msg);

        try {
            search.first(result => {
                if (!result) return message.channel.send('No results found!');

                let {
                    word,
                    definition,
                    example,
                    thumbs_up,
                    thumbs_down,
                    permalink,
                    author
                } = result;

                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`Urban Dictionary | ${word}`, img)
                    .setThumbnail(img)
                    .setDescription(stripIndents `**Definition** ${definition || 'No definition'}
                    **Example:** ${example || 'No example'}
                    **Upvote:** ${thumbs_up || 0}
                    **Downvote:** ${thumbs_down || 0}
                    **Link:** [link to ${word}](${permalink || 'https://www.urbandictionary.com/'})`)
                    .setTimestamp()
                    .setFooter(`Written by ${author || 'Unknown'}`);

                message.channel.send(embed);
            })
        } catch (e) {
            console.log(e);

            return message.channel.send('Error. Try again!');
        }
    }
}