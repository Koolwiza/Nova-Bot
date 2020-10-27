const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const {
    AME_API
} = require('../config');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(AME_API);

module.exports = {
    name: 'magik',
    description: 'Add a dash of magik to the user\'s avatar',
    usage: 'magik [username | nickname | mention | ID]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args) {

        let User = await message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes(args.join(' ').toLocaleLowerCase())) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) ||
            message.author;
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("magik", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        });
        let attachment = new Discord.MessageAttachment(buffer, "magik.png");
        m.delete({
            timeout: 5000
        });
        message.channel.send(attachment);
    }
}