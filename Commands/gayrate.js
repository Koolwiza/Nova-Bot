const Discord = require("discord.js")
const colors = require('../colors.json')

module.exports = {
    name: 'gayrate',
    description: 'Sends you your gay rate',
    usage: 'gayrate [user]',
    usage: 'gayrate',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Gayrate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` gay! 🏳️‍🌈")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Gayrate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.user.username} is \`${gayrate}%\` gay! 🏳️‍🌈`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}