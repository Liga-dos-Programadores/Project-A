/**
 * O Comando "slowmode" colocará lentidão em determinado canal.
*/

const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	run: async function(client, message, args) {
		if (!message.member.hasPermission(['MANAGE_CHANNELS'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })); }

		if(!args[0]) {
			message.channel.setRateLimitPerUser(0)
			return message.channel.send(' > **Slowmode removido** ✨')
		}

		const raw = args[0];
		const milliseconds = ms(raw);

		if(isNaN(milliseconds)) return message.reply('**esse tempo não é válido!**');
		if(milliseconds < 1000) 
			return message.reply('**O tempo mínimo é 1 segundo!**')

		message.channel.setRateLimitPerUser(milliseconds / 10000);
		message.channel.send(
			`**O slowmode foi colocado para ${ms(milliseconds, {
				long: false
			})}. ⌛**`
		)
		// const toslowmode = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		// if (!toslowmode) return message.channel.send(`${message.author}, o uso correto do comando é: \`\`!slowmode [0, 5, 10, 15, 60, etc]\`\` .`).then(msg => msg.delete(5000));
		// const slowmodetime = args[1];
		// if (!slowmodetime) {return message.channel.send(`${message.author}, insira o tempo \`\`[0, 5, 10, 15, 60, etc]\`\` .`).then(msg => msg.delete(5000));}

		// if(toslowmode) {
		// 	message.channel.setRateLimitPerUser(args[0]);
		// 	message.reply(`o tempo do slowmode alterado com sucesso para ${slowmodetime}!`);
		// }
	},

	conf: {},

	get help() {
		return {
			name: 'slowmode',
			description: 'O Comando "slowmode" colocará lentidão em determinado canal.',
			usage: 'slowmode',
			category: 'Moderação',
			aliases: [],
			admin: true,
		};
	},

};