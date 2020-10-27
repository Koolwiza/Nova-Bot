const Discord = require("discord.js")
const colors = require('../colors.json')

module.exports = {
    name: 'dumbrate',
    description: 'Sends you your dumb rate',
    usage: 'dumbrate [user]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
        let gayrate = Math.floor(Math.random() * 101)


        if(!User){
            let gayrateEmbed = new Discord.MessageEmbed()
                .setTitle("Dumbrate Machine")
                .setColor("RANDOM")
                .setDescription("You are `" + gayrate + "%` dumb! <:Dumb:754519337032876102>")
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(gayrateEmbed).catch(e => {
                console.log(e)
            })
        } else {
            let argsEmbed = new Discord.MessageEmbed()
                .setTitle("Dumbrate Machine")
                .setColor("RANDOM")
                .setDescription(`${User.username} is \`${gayrate}%\` dumb! <:Dumb:754519337032876102>`)
                .setFooter(message.client.user.username, message.client.user.avatarURL())
            message.channel.send(argsEmbed).catch(e => {
                console.log(e)
            })
        }
    }
}