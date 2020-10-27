const Discord = require('discord.js')
const { helpers } = require('mal-scraper/src/search')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'demote',
    description: 'Demotes the user to the previous rank',
    usage: 'demote <user> [reason]',
    category: 'Moderation',
    required: 'ADMINISTRATOR',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.roles.cache.some(r => r.id === "761354799894626304")) return
        const tHelper = message.guild.roles.cache.find(role => role.id === "753395776423591987")
        const Helper = message.guild.roles.cache.find(role => role.id === '749070706041684019')
        const tMod = message.guild.roles.cache.find(role => role.id === '749070696222556191')
        const Mod = message.guild.roles.cache.find(role => role.id === '747586003971211285')
        const sMod = message.guild.roles.cache.find(role => role.id === '749071981969670144')
        const tAdmin = message.guild.roles.cache.find(role => role.id === '747608000629571585')
        const Admin = message.guild.roles.cache.find(role => role.id === '746895336844296284')
        const sAdmin = message.guild.roles.cache.find(role => role.id === '754006899464077353')
        const staff = message.guild.roles.cache.find(role => role.id === "746897498521600150")
        const hAdmin = message.guild.roles.cache.find(role => role.id === "747607353498664980")
        const communityManage = message.guild.roles.cache.find(role => role.id === "747575271237877860")
        let member = message.mentions.members.first()
        if (!member) return message.reply("Please mention a user to demote!")

        if (member.roles.cache.some(r => r.id === "753395776423591987")) {
            member.roles.remove(tHelper)
            member.setNickname(member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **member** rank`)
            if (member.roles.cache.some(r => r.name === "Staff")) {
                member.roles.remove(staff)
            }
        }

        if (member.roles.cache.some(r => r.id === "749070706041684019")) {
            member.roles.remove(Helper)
            member.roles.add(tHelper)
            member.setNickname("TH | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${tHelper.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "749070696222556191")) {
            member.roles.remove(tMod)
            member.roles.add(Helper)
            member.setNickname("H | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${Helper.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "747586003971211285")) {
            member.roles.remove(Mod)
            member.roles.add(tMod)
            member.setNickname("TM | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${tMod.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "749071981969670144")) {
            member.roles.remove(sMod)
            member.roles.add(Mod)
            member.setNickname("M | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${Mod.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "747608000629571585")) {
            member.roles.remove(tAdmin)
            member.roles.add(sMod)
            member.setNickname("SM | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${sMod.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "746895336844296284")) {
            member.roles.remove(Admin)
            member.roles.add(tAdmin)
            member.setNickname("TA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${tAdmin.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "754006899464077353")) {
            member.roles.remove(Admin)
            member.setNickname("A | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${Admin.name}** rank`)
        }

        if (member.roles.cache.some(r => r.id === "747607353498664980")) {
            member.roles.remove(sAdmin)
            member.setNickname("SA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${sAdmin.name}** rank`)
        }
        if (member.roles.cache.some(r => r.id === "747575271237877860")) {
            member.roles.remove(hAdmin)
            member.setNickname("HA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Demoted **${member.user.tag}** to **${hAdmin.name}** rank`)
        }
    }

}