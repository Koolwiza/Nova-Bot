const {
	PREFIX
} = require('../config.json');
const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const {
	Collection
} = require('discord.js')

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	category: 'Utility',
	usage: 'help [command]',
	cooldown: 5,
	execute(message, args) {
		const data = [];

		let categories = new Discord.Collection()

		if (!args.length) {
			message.client.commands.forEach(command => {
				const category = categories.get(command.category)
				if (category) {
					category.set(command.name, command)
				} else {
					categories.set(command.category, new Collection().set(command.name, command))
				}
			})

			const lines = categories.map((category, name) => `**${name}**: \n\`${category.map(command => command.name).join('`, `')}\``)

			let noArgEmbed = new Discord.MessageEmbed()
				.setThumbnail(message.guild.iconURL({
					dynamic: true
				}))
				.setDescription(`Want to know more about a command? \nDo \`${PREFIX}help <command>\` for more info! E.g \`${PREFIX}help kick\`\n\n\`\`\`\n[] - Optional\n<> - Required\n\`\`\``)
				.addField("Commands: ", `${lines.join('\n')}`)
				.setColor(colors.gold)
				.setAuthor(message.author.tag, message.author.avatarURL({
					dynamic: true
				}))
				.setFooter(message.client.user.username, message.client.user.avatarURL())
				.setTitle(`${message.client.user.username} Bot Help`)

			return message.channel.send(noArgEmbed)
				.catch(error => {
					console.error(`Could not send help to ${message.author.tag}.\n`, error);
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** \`${PREFIX}${command.usage}\``);
		if (command.example) data.push(`**Example:** \`${PREFIX}${command.example}\``)
		if (command.required) data.push(`**Required Permission:**\`${command.required}\``)

		let helpEmbed = new Discord.MessageEmbed()
			.setTitle(":books: Command Help")
			.setDescription(data)
			.setColor(colors.gold)
			.setFooter(message.client.user.username, message.client.user.avatarURL())
		message.channel.send(helpEmbed)
	},
};