const Discord = require("discord.js")
const colors = require('../colors.json')

module.exports = {
    name: 'lesrate',
    description: 'Sends you your lesbian rate',
    usage: 'lesrate [user]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
             || message.member;let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Les-rate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` lesbian! <:cursedflush:761344949458698250>")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Les-rate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.username} is \`${gayrate}%\` lesbian! <:cursedflush:761344949458698250>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}