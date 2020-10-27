const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: 'triggered',
    description: 'Makes a triggered version',
    usage: 'triggered [user]',
    category: 'Images',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
             || message.member;
    let triggered = await canvacord.trigger(user.displayAvatarURL({ format: "png", dynamic: false }));

    let attachment = new MessageAttachment(triggered, "triggered.gif");

    return message.channel.send(attachment);
    }
}