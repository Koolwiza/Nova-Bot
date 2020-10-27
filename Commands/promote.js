const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'promote',
    description: 'Promotes the user to the next rank',
    usage: 'promote <user> [reason]',
    required: 'ADMINISTRATOR',
    category: 'Moderation',
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
        const coOwn = message.guild.roles.cache.find(role => role.id === "747607353498664980")
        let member = message.mentions.members.first()
        if(!member) return message.reply("Please mention a user to promote!")

        if (member.roles.cache.some(r => r.id === "753395776423591987")) {
            member.roles.add(Helper).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(tHelper).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("H | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${Helper.name}`)

            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                }).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "749070706041684019")) {
            member.roles.add(tMod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(Helper).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("TM | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await message.channel.send(`Promoted **${member.user.tag}** to ${tMod.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "749070696222556191")) {
            member.roles.add(Mod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(tMod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("M | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${Mod.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "747586003971211285")) {
            member.roles.add(sMod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(Mod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("SM | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${sMod.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "749071981969670144")) {
            member.roles.add(tAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(sMod).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("TA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${tMod.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "747608000629571585")) {
            member.roles.add(Admin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(tAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("A | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${Admin.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "746895336844296284")) {
            member.roles.add(sAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(Admin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("SA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${sAdmin.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "754006899464077353")) {
            member.roles.add(hAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(sAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("HA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${hAdmin.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        } else if (member.roles.cache.some(r => r.id === "747607353498664980")) {
            member.roles.add(communityManage).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            await member.roles.remove(hAdmin).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })

            member.setNickname("HA | " + member.user.username).catch(e => {
                console.log(e)
                message.reply("There was an unexpected error, please try again")
            })
            await message.channel.send(`Promoted **${member.user.tag}** to ${hAdmin.name}`)
            if (!member.roles.cache.some(r => r.id === "746897498521600150")) {
                member.roles.add(staff).catch(e => {
                    console.log(e)
                    message.reply("There was an unexpected error, please try again")
                })
            }
        }
    }
}