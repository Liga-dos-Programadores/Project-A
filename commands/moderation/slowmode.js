/**
 * O Comando "slowmode" colocará lentidão em determinado canal.
*/

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {

		if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não tem permissão para usar esse comando! 🤨'); }

		const toslowmode = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!toslowmode) return message.channel.send(`${message.author}, o uso correto do comando é: \`\`!slowmode [0, 5, 10, 15, 60, etc]\`\` .`).then(msg => msg.delete(5000));

		const slowmodetime = args[1];
		if (!slowmodetime) {return message.channel.send(`${message.author}, insira o tempo \`\`[0, 5, 10, 15, 60, etc]\`\` .`).then(msg => msg.delete(5000));}

		if(toslowmode) {
			message.channel.setRateLimitPerUser(args[0]);
			message.reply(`o tempo do Slowmode alterado com sucesso para ${slowmodetime}!`);
		}
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'slowmode',
			description: 'O Comando "slowmode" colocará lentidão em determinado canal.',
			usage: 'slowmode',
		};
	},

};