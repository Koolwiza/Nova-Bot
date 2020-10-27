const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const config = require('../config.json')

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user',
    usage: 'blacklist <user>',
    required: 'DEVELOPER',
    category: 'Developer',
    guildOnly: true,
    async execute(message, args) {
        if (message.author.id === config.owner) {
            let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
            let bReason = args.join(" ").slice(32)
            let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setDescription('Please provide a valid user')
                .addField("Usage:", '`blacklist <user> [reason]`')
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            if (!User) return message.channel.send(noUser)

            let checkingBlacklisted = db.fetch(`blacklisted_${User.id}`)

            if (!bReason) bReason = 'No reason defined'
            db.set(`blacklistMember_${User.id}`, true)
            let blacklistedEmbed = new Discord.MessageEmbed()
                .setDescription('I have blacklisted **' + User + '**')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.green)
                .addField('Reason:', bReason)
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            message.channel.send(blacklistedEmbed)
            if(checkingBlacklisted == true){
                let alreadyBlacklisted = new Discord.MessageEmbed()
                .setDescription('This user is already blacklisted!')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setFooter(message.client.user.username, message.client.user.avatarURL())

            return message.channel.send(alreadyBlacklisted)
            }
            
        } else {
            let cannotUse = new Discord.MessageEmbed()
                .setDescription('You cannot use this command. Only **OWNERS** can use this.')
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(cannotUse)
        }
    }
}