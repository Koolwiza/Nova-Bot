const Discord = require('discord.js')

module.exports = {
    name: 'nuke',
    description: 'Nukes the channel',
    usage: 'nuke',
    category: 'Moderation',
    required: 'MANAGE_CHANNELS',
    guildOnly: true,
    execute (message, args) {
        //setting perms to use
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            return message.channel.send("You Don't Have Permission!")
        }
        message.channel.clone().then
        ((ch) => {
            ch.setParent(message.channel.parent);
            ch.setPosition(message.channel.position);
            message.channel.delete().then(() => {
                ch.send("**Channel Has Been Nuked** \n https://imgur.com/LIyGeCR").then(r => r.delete({ timeout: 5000}))
            })

        });
    }
}