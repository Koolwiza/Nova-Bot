const Discord = require('discord.js')
const {parse} = require("twemoji-parser");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'addemoji',
    description: 'Adds the emoji to the server',
    usage: 'emoji <emoji>',
    category: 'Utility',
    required: 'MANAGE_EMOJIS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please give me a emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            ).catch(error => {
                console.log(error)
            })
            const Added = new MessageEmbed()
                .setTitle(`Emoji added`)
                .setColor(Math.floor(Math.random() * 16777215))
                .setDescription(
                    `**Emoji has been added!** | **Name:** \`${name || `${customemoji.name}`}\` | **Preview:** [Click me](${Link})`
                );
            return message.channel.send(Added).catch(e => {
                console.log(e)
            })
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.channel.send(`Please give me a valid emoji!`);
            message.channel.send(
                `You can use normal emoji without adding in server!`
            );
        }
    }
};
