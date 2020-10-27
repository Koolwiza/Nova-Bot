const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')
const Long = require('long')

module.exports = {
    name: 'crime',
    description: 'Do a criminal job with a slight chance of you failing!',
    usage: 'crime',
    category: 'Economy',
    guildOnly: true,
    async execute(message, args) {
        let payment = Math.floor(Math.random() * 1001) + 250
        let percentGenerater = Math.floor(Math.random() * 101)

        if (percentGenerater > 35) {
            let timeout = 10 * 60000;
            let work = await db.fetch(`crime_${message.guild.id}_${message.author.id}`);

            if (work !== null && timeout - (Date.now() - work) > 0) {
                let time = ms(timeout - (Date.now() - work));

                return message.channel.send(`Please wait 10 minutes before doing crime again`)
            } else {
                db.add(`money_${message.guild.id}_${message.author.id}`, payment);
                db.set(`crime_${message.guild.id}_${message.author.id}`, Date.now());

                let workEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL({
                        dynamic: true
                    }))
                    .setDescription("You robbed <a:coin1:762153326430912532>" + payment + ' from the bank!')
                    .setTimestamp()
                    .setColor("GREEN")
                message.channel.send(workEmbed)

            }
        } else {
            let authorsCash = db.fetch(`money_${message.guild.id}_${message.author.id}`)
            let percentAmount = Math.floor(Math.random() * 33)
            let robAmount = Math.floor(authorsCash * (percentAmount) / 100)

            db.subtract(`money_${message.guild.id}_${message.author.id}`, robAmount)
            db.set(`crime_${message.guild.id}_${message.author.id}`, Date.now())

                let embed = new Discord.MessageEmbed()
                .setTitle('Failed!')
                .setColor(colors.red)
                .setDescription(`A cop caught you while robbing the bank! You were fined <a:coin1:762153326430912532> ${robAmount}!`)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL({
                    dynamic: true
                }))
            message.channel.send(embed)
        }
    }
}