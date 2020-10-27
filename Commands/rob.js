const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'rob',
    description: 'Rob someone',
    usage: 'rob',
    category: 'Economy',
    guildOnly: true,
    async execute(message, args) {
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;

        let noUserEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL({
                dynamic: true
            }))
            .setColor("RED")
            .addField('Usage:', '`rob <user>`')
        if (!User) return message.channel.send(noUserEmbed)

        let usersCash = db.fetch(`money_${message.guild.id}_${User.id}`)
        let authorCash = db.fetch(`money_${message.guild.id}_${message.author.id}`)
        let author = await db.fetch(`rob_${message.guild.id}_${User.id}`)

        let timeout = 60000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setDescription(`<:xmark:761665920459341894> You have already robbed someone\nTry again in 10 minutes `);
            message.channel.send(timeEmbed)
        } else {

            let moneyEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
                .setDescription(`<:xmark:761665920459341894> You need atleast 200 coins in your wallet to rob someone`);

            if (authorCash < 200) {
                return message.channel.send(moneyEmbed)
            }

            if (usersCash < 0) {
                let moneyEmbed2 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag, message.author.avatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setDescription(`<:xmark:761665920459341894> ${User.user.username} does not have anything you can rob`);
                message.channel.send(moneyEmbed2)
            }
            let percentAmount = Math.floor(Math.random() * 43)
            let robAmount = Math.floor(usersCash * (percentAmount) / 100)
            db.subtract(`money_${message.guild.id}_${User.id}`, robAmount)
            db.add(`money_${message.guild.id}_${message.author.id}`, robAmount)
            db.set(`rob_${message.guild.id}_${User.id}`, Date.now())

            let embed = new Discord.MessageEmbed()
                .setDescription(`<:check:761665701408538634> You robbed <a:coin1:762153326430912532> ${robAmount} from ${User.user.tag}`)
                .setColor("GREEN")
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            message.channel.send(embed)


        }
    }
}