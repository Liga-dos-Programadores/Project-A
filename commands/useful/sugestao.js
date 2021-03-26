/**
 * O Comando "sugestion" irá receber a sugestão do membro e enviá-la para um canal expecífico.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {

		const msg = args.join(' ');

		if (!msg) {
			message.channel.send(`${message.author}, digite: \`\`!sugestao[sua sugestão]\`\` :mailbox_with_no_mail:`);
			return undefined;
		}

		const embed = new Discord.MessageEmbed()
			.setAuthor(`📩 Sugestão de: ${message.author.username}`, message.author.displayAvatarURL())
			.setDescription(`${msg}`)
			.setColor(process.env.COLOR)
			.setFooter('2021 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

			client.channels.cache.get(process.env.SUGESTOES).send(embed)
			.then((m) => {
				m.react('👍');
				m.react('👎');
				message.delete({ timeout: 1000 });
				message.channel.send(`${message.author}, sua sugestão foi enviada no canal de sugestões! 📬 A staff irá analizar e logo irá enviar um feedback :)`);
			}).catch(console.log);
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'sugestao',
			description: 'Pega a sugestão do usuário.',
			usage: 'sugestao',
		};
	},
};
