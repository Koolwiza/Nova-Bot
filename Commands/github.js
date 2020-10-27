const Discord = require('discord.js')
const colors = require('../colors.json')
const fetch = require('node-fetch')
const moment = require('moment')
const client = require('../index.js')

module.exports = {
    name: 'github',
    description: 'Search for things on Github',
    usage: 'github <search>',
    category: 'Utility',
    guildOnly: true,
    execute(message, args){
        if (!args[0]) return message.channel.send({
            embed:{
                description: `**Please Give Me A Github Username!**`
            }
        })
    // Made by Zukii
        fetch(`https://api.github.com/users/${args.join('-')}`)
          .then(res => res.json()).then(body => {
            if(body.message) return message.channel.send({
                embed:{
                    description: ` **User Not Found | Please Give Me A Valid Username!**`
                }
            });
          let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
      
                  const embed = new Discord.MessageEmbed()
                  .setAuthor(`${login} Information!`, avatar_url)
                  .setColor(`RANDOM`)
                  .setThumbnail(`${avatar_url}`)
                  .addField(`Username`, `${login}`)
                  .addField(`ID`, `${id}`)
                  .addField(`Bio`, `${bio || "No Bio"}`)
                  .addField(`Public Repositories`, `${public_repos || "None"}`, true)
                  .addField(`Followers`, `${followers}`, true)
                  .addField(`Following`, `${following}`, true)
                  .addField(`Location`, `${location || "No Location"}`)
                  .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
                  .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                  .setTimestamp()
                  message.channel.send(embed)
    
          })
    }
}