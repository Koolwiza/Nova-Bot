const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const imdb = require("imdb-api");


module.exports = {
    name: 'movie',
    description: 'Searches for a movie with info',
    usage: 'movie <movie',
    aliases: ['moviesearch'],
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
        if (!args.length) {
            return message.channel.send("Please give the name of movie or series");
          }
      
          const imob = new imdb.Client({ apiKey: "5e36f0db" }); //You need to paste you imdb api
      
          let movie = await imob.get({ name: args.join(" ") });
      
          let embed = new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setTitle(movie.title)
          .setURL(movie.imdburl)
          .setDescription(movie.plot)
          .setThumbnail(movie.poster)
          .addField("❯ Rate", movie.rating, true)
          .addField("❯ Time", movie.runtime, true)
          .addField("❯ Awards", movie.awards, true)
          .addField("❯ Langueages", movie.languages, true)
          .addField("❯ Genres", movie.genres, true)
          .addField("❯ PG", movie.rated, true)
          .addField("❯ Coutry", movie.country, true)
          .addField("❯ Released", movie.released)
          .setFooter('All information is provided by IMDB')
      
          message.channel.send(embed)
    }
}