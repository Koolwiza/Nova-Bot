const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const figlet = require('figlet')

module.exports = {
    name: 'ascii',
    description: 'Transform your text to ascii',
    usage: 'ascii <text>',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args){

        let noArgsEmbed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription("Please provide some text")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if(!args[0]) return message.channel.send(noArgsEmbed);

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }
}