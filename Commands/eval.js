module.exports = {
    name: 'eval',
    description: 'Evaluates your code',
    usage: 'eval <evaluation>',
    required: 'DEVELOPER',
    aliases: ['ev', 'evaluate'],
    category: 'Developer',
    guildOnly: true,
    async execute(message, args) {
        if (message.author.id["559191331298213898"]) return

        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            await message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}
