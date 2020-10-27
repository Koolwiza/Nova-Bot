const Discord = require("discord.js")
const colors = require('../colors.json')

module.exports = {
    name: 'smartrate',
    description: 'Sends you your smart rate',
    usage: 'smartrate [user]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
             || message.member;let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Smartrate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` smart! <:BigBrain:762126856463188008>")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Smartrate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.username} is \`${gayrate}%\` smart! <:BigBrain:762126856463188008>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}