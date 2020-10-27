const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    usage: 'ban <user> [reason]',
    category: 'Moderation',
    required: 'BAN_MEMBERS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have permission to use this command")
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
             || message.member;let banReason = args.join(" ").slice(23)
        if (!banReason) {
            banReason = "No reason provided"
        }

        let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setDescription('Please provide a valid user')
                .addField("Usage:", '`ban <user> [reason]`')
                .setFooter(message.client.user.username, message.client.user.avatarURL())


        if (!User) return message.channel.send(noUser)
        let banDmEmbed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .setColor(colors.red)
            .setDescription(`**You have been banned from: \`${message.guild.name}\`**\n**Reason:** ${banReason}\n**Moderator:** <@${message.author.id}> (${message.author.id})`)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.avatarURL({
                dynamic: true
            }))
        User.ban(banReason).catch(e => {
            console.log(e)
            message.reply("there was an unexpected error")
        })
        await User.send(banDmEmbed).catch(e => {
            console.log(e)
            message.channel.send("There was an unexpected error: ```\n" + e + "\n```\nUser probably has DM's closed")
        })

        let messageChannelEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription("<a:tickyes:743243992199725088>** " + User.user.username + " successfully banned | **" + banReason)
            .setColor(colors.green)
        await message.channel.send(messageChannelEmbed).catch(e => {
            console.log(e)
            message.channel.send("There was an unexpected error: ```\n" + e + "\n```")
        })
    }
}