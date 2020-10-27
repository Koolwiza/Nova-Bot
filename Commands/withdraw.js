const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'with',
    description: 'Withdraw your money',
    usage: 'with <money>',
    category: 'Economy',
    guildOnly: true,
    async execute(message, args) {
        let User = message.mentions.users.first()

        if (args[0] === "all") {
            let totalCash = db.fetch(`bank_${message.guild.id}_${message.author.id}`)
            db.add(`money_${message.guild.id}_${message.author.id}`, totalCash);
            db.subtract(`bank_${message.guild.id}_${message.author.id}`, totalCash);

            let totalEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription(`<:check:761665701408538634> Withdrew <a:coin1:762153326430912532> ${totalCash} from your bank!`)
            .setTimestamp()
            .setColor("GREEN")
        message.channel.send(totalEmbed)

        } else {
            let amount = parseInt(args[0])
            
            let bankAmount = db.fetch(`bank_${message.guild.id}_${message.author.id}`)
            if(amount > bankAmount) return message.reply("You don't have that much in your bank")

            db.add(`money_${message.guild.id}_${message.author.id}`, amount);
            db.subtract(`bank_${message.guild.id}_${message.author.id}`, amount);

            let amountEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription(`<:check:761665701408538634> Withdrew <a:coin1:762153326430912532> ${amount} from your bank!`)
            .setTimestamp()
            .setColor("GREEN")
        message.channel.send(amountEmbed)
        }


        

    }
}