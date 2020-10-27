const Discord = require("discord.js")
const colors = require('../colors.json')

module.exports = {
    name: 'cuterate',
    description: 'Sends you your cute rate',
    usage: 'cutrate [user]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Cuterate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` cute! <a:CH_cute:762127307334090752>")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Cuterate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.user.username} is \`${gayrate}%\` cute! <a:CH_cute:762127307334090752>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}