const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'dep',
    description: 'Deposit your money',
    usage: 'dep <money>',
    aliases: ['deposit', 'dep'],
    category: 'Economy',
    guildOnly: true,
    async execute(message, args) {
        let User = message.mentions.users.first()

        if (args[0] === "all") {
            let totalCash = db.fetch(`money_${message.guild.id}_${message.author.id}`)

            db.subtract(`money_${message.guild.id}_${message.author.id}`, totalCash);
            db.add(`bank_${message.guild.id}_${message.author.id}`, totalCash);

            let totalEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription(`<:check:761665701408538634> Deposited <a:coin1:762153326430912532> ${totalCash} to your bank!`)
            .setTimestamp()
            .setColor("GREEN")
        message.channel.send(totalEmbed)

        } else {
            let amount = parseInt(args[0])

            let totalAmountInHand = db.fetch(`money_${message.guild.id}_${message.author.id}`)

            if(amount > totalAmountInHand) return message.reply("You don't have that much in hand")

            db.subtract(`money_${message.guild.id}_${message.author.id}`, amount);
            db.add(`bank_${message.guild.id}_${message.author.id}`, amount);

            let amountEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription(`<:check:761665701408538634> Deposited <a:coin1:762153326430912532> ${amount}`)
            .setTimestamp()
            .setColor("GREEN")
        message.channel.send(amountEmbed)
        }


        

    }
}