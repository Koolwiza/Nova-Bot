const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const nbx = require('noblox.js')

module.exports = {
    name: 'payout',
    description: 'Payout a member of the group robux',
    usage: 'payout <member> <amount>',
    category: 'Developer',
    guildOnly: true,
    async execute(message, args) {

        if (message.author.id === "559191331298213898" || message.author.id === "443896618060742657" || message.author.id === "714127481375817791") {

            let robloxUsername = args[0]
            let robuxAmount = Number(args[1])
            if (!robloxUsername) return message.reply("you didn't provide a user")
            if (!robuxAmount) return message.reply('please specify the amount you want to pay')

            let confirmationEmbed = new Discord.MessageEmbed()
                .setTitle("Please confirm")
                .setColor(colors.green)
                .setDescription(`**Confirm payout of <:robux:713901077426208828> ${robuxAmount} to ${robloxUsername}**\n\`\`\`\nPlease react with ✅ to confirm. If not, please react with ❌ to cancel the process.\nYou have 60 seconds to finish this process\n\`\`\``)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())

            let successEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(colors.green)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription(`Successfully payed out **${robloxUsername}** <:robux:713901077426208828> ${robuxAmount}!\n\n**- - More Info - - **\nRoblox Username: ${robloxUsername}\nPayed Robux: ${robuxAmount}\nGroup ID: 4075500`);

            let sendEmbed = await message.channel.send(confirmationEmbed).then(async sMessage => {
                sMessage.react('✅')
                await sMessage.react('❌')

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                sMessage.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === '✅') {
                        let userReactions = (sMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }

                        let robloxIdFromUser = nbx.getIdFromUsername(robloxUsername).then((userid) => {
                            nbx.groupPayout({
                                group: 4075500,
                                member: userid,
                                amount: robuxAmount,
                                recurring: false
                            }).then(() => {
                                message.channel.send(successEmbed)
                            })
                        })

                    } else {
                        let payoutCanceledEmbed = new Discord.MessageEmbed()
                            .setTitle('Payout cancelled')
                            .setColor(colors.red)
                            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                            .setDescription(`The payout to ${robloxUsername} of <:robux:713901077426208828> ${robuxAmount} was cancelled, if this was a mistake please try the command again.`)
                        return message.channel.send(payoutCanceledEmbed)
                    }
                })

            })



        } else {
            var embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setDescription("You don't have permission to use this command!")
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            return message.channel.send(embed)
        }

    }
}