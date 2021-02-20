/**
 * O Comando "novidades" adiciona o cargo de "Novidades" aos membros.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo arquivo message.js
	  * Que passara os argumentos atraves do middleware.
	*/

	run: (client, message) => {

		/** Verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */

		const role = message.guild.roles.cache.has(process.env.NOVIDADES);
		let member = message.mentions.users.first() || message.author

		if (!role) {
			const notifyEmbed1 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Esse cargo não existe no servidor!')
				.setFooter('2021 © Liga dos Programadores.')
				.setTimestamp()
			message.channel.send(notifyEmbed1);
		}
		else if (!message.member.roles.cache.has(role.id)) {
			member.roles.cache.add(role.id);

			const notifyEmbed2 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Adicionou cargo novidades 🔔')
				.setDescription('*Agora você receberá notificações quando houver notícias da comunidade!*')
				.setFooter('2021 © Liga dos Programadores.')
				.setTimestamp();

			message.channel.send(notifyEmbed2);
		}
		else {
			message.member.roles.cache.remove(role.id);

			const notifyEmbed3 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Removeu cargo novidades 🔕')
				.setDescription('*Voce removeu o cargo, não irá receber mais notificações da comunidade.*')
				.setFooter('2021 © Liga dos Programadores.')
				.setTimestamp()

			message.channel.send(notifyEmbed3);
		}
	},

	conf: {
		// Comando deve ser usado apenas dentro de um servidor
		onlyguilds: true,
	},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
   */

	get help() {
		return {
			name: 'novidades',
			category: 'info',
			description: 'O Comando "novidades" adiciona o cargo de "Novidades" aos membros.',
			usage: 'novidades',
		};
	},
};