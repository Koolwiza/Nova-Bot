const Discord = require('discord.js')
const colors = require('../colors.json')
const ms = require('ms')

module.exports = {
    name: 'lock',
    description: 'Locks a channel',
    usage: 'lock <channel>',
    category: 'Moderation',
    required: 'MANAGE_CHANNELS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                new Discord.MessageEmbed()
                .setDescription("You don't have enough permissions to use this command.")
                .setColor(colors.red)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                }))
            )
        if (!message.mentions.channels.first()) return message.channel.send(
            new Discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription("You didn't specify a channel to lock.")
        )

        if (!message.guild.me.hasPermission) {
            return message.channel.send({
                embed: {
                    title: 'Missing Permissions',
                    description: "I don't have permission to execute this command!",
                    color: "RED",
                    footer: {
                        text: message.client.user.username,
                        icon_url: message.client.user.displayAvatarURL()
                    },
                    timestamp: new Date()
                }
            })
        }

        let time = args[1]

        let Channel = message.mentions.channels.first()

        try {
            await Channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            });
            
            message.channel.send({
                embed: {
                    title: 'Success!',
                    description: `🔒 <#${Channel.id}> has been locked`
                }
            })
        } catch (err) {
            console.log(err);
        }

        setTimeout(() => {
            Channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: true
            }, ms(time))
        })
    }
}