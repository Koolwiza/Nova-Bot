// Modules //

const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')
const chalk = require('chalk')
const db = require('quick.db')
const nbx = require('noblox.js')

// Miscellaneous //

const {
    token,
    PREFIX
} = require('./config.json')
const client = new Discord.Client()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.commands = new Discord.Collection()


// Bot Code //

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {

    console.log(chalk.bgGreenBright.black("[" + client.user.username + "]"), "Bot Online");
    client.user.setActivity('@NovaBot help 💖', {
        type: "PLAYING"
    });

    async function login() {
        await nbx.setCookie('')
    }

    login()
});

client.on('messageDelete', async message => {
    db.set(`msg_${message.channel.id}`, message.content)
    db.set(`author_${message.channel.id}`, message.author.id)
})

client.on('message', async message => {

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : PREFIX;

    let mentionEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setAuthor(`${message.client.user.username}`, message.client.user.avatarURL())
        .setDescription("👋 Hello, my prefix is `^`. Use `^help` for all of my commands!")
        .setColor(Math.floor(Math.random() * 16777215))
        .setFooter(message.client.user.username, message.client.user.displayAvatarURL({
            dynamic: true
        }))


    if (message.mentions.users.has(message.client.user.id)) message.channel.send(`<@${message.author.id}>`, mentionEmbed)

    if (!message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    let checkingBlacklistedMembers = db.fetch(`blacklistMember_${message.author.id}`)
    if (checkingBlacklistedMembers === null) {
        checkingBlacklistedMembers === false
    }


    let blacklistedEmbed = new Discord.MessageEmbed()
        .setTitle("YOU HAVE BEEN BLACKLISTED")
        .setColor(Math.floor(Math.random() * 16777215))
        .setDescription("You have been blacklisted from my commands. If you wish to appeal, please DM <@559191331298213898> for more info.")
        .setFooter(`${client.user.username}`, client.user.avatarURL())

    if (checkingBlacklistedMembers === true) message.channel.send(blacklistedEmbed)

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    try {
        command.execute(message, args, client);
        console.log(chalk.greenBright('[COMMAND]'), `${message.author.tag} used the command ` + commandName)
    } catch (error) {
        console.log(error);
        message.reply('there was an error trying to execute that command! ```\n' + error + "\n```");
    }
});

client.login(token).catch(error => {
    console.log(chalk.red('[ERROR] ') + error)
})
