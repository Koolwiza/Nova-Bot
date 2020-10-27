const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'message',
    description: 'Send a message to a user',
    usage: 'messages <user> [message]',
    aliases: ['msg'],
    category: 'Fun',
    guildOnly: true,
    async execute(message, args) {

        let msgUser = message.mentions.users.first()
        let messageBeingSent = args.join(" ").slice(22)

        if (!message) {
            let noMessageEmbed = new Discord.MessageEmbed()
                .setTitle('Conversation Started')
                .setColor(colors.green)
                .setTimestamp()
                .setDescription(`You will be in this conversation with ${msgUser.username} for 5 minutes. All messages sent from now on will be sent to **${msgUser.tag}**!`)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL({
                    dynamic: true
                }))
            db.set(`inconvo_${message.author.id}_${msgUser.id}`, true)
        } else {

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor(colors.green)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription(`\`\`\`\n${messageBeingSent}\n\`\`\``)

            msgUser.send(embed).catch(err => {
                message.channel.send("I couldn't message this user, maybe their DM's are turned off?")
            })
            let confirmationEmbed = new Discord.MessageEmbed()
                .setTitle('Message Sent!')
                .setThumbnail(msgUser.displayAvatarURL({dynamic:true}))
                .setColor(colors.green)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            await message.channel.send(confirmationEmbed)
        }


    }
}