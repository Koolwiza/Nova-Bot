const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'beg',
    description: 'Beg and get paid',
    usage: 'beg',
    category: 'Economy',
    guildOnly: true,
    async execute(message, args){
        let payment = Math.floor(Math.random() * 501)

        let timeout = 5 * 60000;
        let work = await db.fetch(`beg_${message.guild.id}_${message.author.id}`);

        if(work !== null && timeout - (Date.now() - work) > 0){
            let time = ms(timeout - (Date.now() - work));

            return message.channel.send(`Please wait 5 minutes before begging again`)
        } else {
            db.add(`money_${message.guild.id}_${message.author.id}`, payment);
            db.set(`beg_${message.guild.id}_${message.author.id}`, Date.now());

            let workEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                .setDescription("**Bill Gates:** ugh, fine here's <a:coin1:762153326430912532>" + payment + '!')
                .setTimestamp()
                .setColor("GREEN")
            message.channel.send(workEmbed)

        }
    }
}