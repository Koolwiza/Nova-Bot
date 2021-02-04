const Discord = require("discord.js");
const {parse} = require("twemoji-parser");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'delemoji',
    description: 'Deletes an emoji from the server',
    usage: 'delemoji <emoji>',
    category: 'Utility',
    required: 'MANAGE_EMOJIS',
    guildOnly: true,
    execute(message, args) {
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`You Don't Have Permission To Use This Command! Manage Emojis`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
                customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.resolve(customemoji.id).delete();

            const Added = new MessageEmbed()
                .setTitle(`Emoji Deleted`)
                .setColor(Math.floor(Math.random() * 16777215))
                .setDescription(
                    `Emoji Has Been Deleted!`
                );
            return message.channel.send(Added);
        } else {
            let CheckEmoji = parse(emoji, {assetType: "png"});
            if (!CheckEmoji[0])
                return message.channel.send(`Please Give Me A Valid Emoji!`);
            message.channel.send(
                `You Can Use Normal Emoji Without Adding In Server!`
            );
        }
    }
}
