const cooldown = new Map();
const queue = new Map();

require('dotenv').config();

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */

module.exports = async (client, message) => {
	if (message.author.bot || message.channel.type !== 'text') return;

	if (message.isMentioned(client.user)) {
		message.reply('o meu prefixo neste servidor é `!`, para ver o que eu posso fazer use `!help` em <#' + process.env.COMMANDS + '>!');
	}

	if (!message.content.startsWith(process.env.COMMANDS)) {
		return;
	}

	const args = message.content.split(' ');
	const cmd = args.shift();

	if (message.channel.id !== process.env.COMMANDS) {
		if (cmd !== '!limpar' && cmd !== '!embed' && cmd !== '!chat' && cmd !== '!slowmode' && cmd !== '!langs' && cmd !== '!spacemychannel') {
			message
				.reply(`utilize o canal <#${process.env.COMMANDS}> para executar um comando!`)
				.then(msg => msg.delete(5000));
			return;
		}
	}

	const command = getCommand(client, cmd);
	if (command) {
		message.delete(1000)
			.catch(console.error);

		if (cooldown.has(message.author.id)) {
			const timeSinceLastCommand = Date.now() - cooldown.get(message.author.id);
			if (timeSinceLastCommand < process.env.COOLDOWN) {
				message
					.reply(`Aguarde ${((process.env.COOLDOWN - timeSinceLastCommand) / 1000).toFixed(2)} segundos para executar um novo comando.`)
					.then(msg => msg.delete(5000));
				return;
			}
		}

		if (!message.member.roles.cache.find(role => role.name === 'Administrador' || role.name === 'Moderador')) {
			cooldown.set(message.author.id, Date.now());
		}

		command.run(client, message, args, queue);
	}
};

function getCommand(client, name) {
	name = name.slice(process.env.length);

	let command = client.commands.get(name);
	if (!command) {
		command = client.commands.get(client.aliases.get(name));
	}

	return command;
}