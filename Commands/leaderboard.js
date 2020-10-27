const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'leaderboard',
    description: 'Sends the leaderboard for economy',
    usage: 'leaderboard <-bank | -cash>',
    aliases: ['lb', 'top'],
    category: 'Economy',
    guildOnly: true,
    async execute(message, args) {
        let cashInHand = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data)
        let moneyInBank = db.all().filter(data => data.ID.startsWith(`bank`)).sort((a, b) => b.data - a.data)

        cashInHand.length = 10;
        moneyInBank.length = 10
        var finalLb = "";
        if (!args.length) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                })).setDescription('<:xmark:761665920459341894> Invalid `[-cash | -bank]` arguments given.')
                .addField('Usage:', '`leaderboard <-cash | -bank>`')
                .setColor(colors.red)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                message.channel.send(embed)

        } else if (args[0] === "-cash") {
            for (var i in cashInHand) {
                finalLb += `**${cashInHand.indexOf(cashInHand[i])+1}. <@${message.client.users.cache.get(cashInHand[i].ID.split('_')[2]) ? message.client.users.cache.get(cashInHand[i].ID.split('_')[2]).id : "Unknown User#0000"}>** • <a:coin1:762153326430912532>  ${cashInHand[i].data}\n`;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name}'s Cash Leaderboard`, 'https://media.discordapp.net/attachments/506838906872922145/506899959816126493/h5D6Ei0.png')
                .setColor("#7289da")
                .setDescription(finalLb)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed);
        } else if (args[0] === "-bank") {
            for (var i in moneyInBank) {
                finalLb += `**${moneyInBank.indexOf(moneyInBank[i])+1}. <@${message.client.users.cache.get(moneyInBank[i].ID.split('_')[2]) ? message.client.users.cache.get(moneyInBank[i].ID.split('_')[2]).id : "Unknown User#0000"}>** • <a:coin1:762153326430912532>  ${moneyInBank[i].data}\n`;
            }
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name}'s Bank Leaderboard`, 'https://media.discordapp.net/attachments/506838906872922145/506899959816126493/h5D6Ei0.png')
                .setColor("#7289da")
                .setDescription(finalLb)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed);
        }

    }
}