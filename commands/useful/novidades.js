/**
 * O Comando "novidades" adiciona o cargo de "Novidades" aos membros.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	run: (client, message, args) => {
		const notifyRole = message.guild.roles.cache.get(process.env.NOVIDADES);

		if(!notifyRole) {
			const notifyEmbed1 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Não foi encontrado o id do cargo ou ele não existe no servidor!')
				.setFooter('2021 © Liga dos Programadores')
				.setTimestamp()
			message.channel.send(notifyEmbed1);
		} 
		
		else if(!message.member.roles.cache.has(notifyRole) ) {
			message.member.roles.add(notifyRole)

			const notifyEmbed2 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Você adicionou o cargo Novidades 🔔')
				.setDescription('*Agora você receberá notificações quando houver notícias da comunidade!*')
				.setFooter('2021 © Liga dos Programadores')
				.setTimestamp();

			message.channel.send(notifyEmbed2);
		}
		
		else if(message.member.roles.cache.has(notifyRole)) {
			message.member.roles.remove(notifyRole);

			const notifyEmbed3 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Você removeu cargo novidades 🔕')
				.setDescription('*Voce removeu o cargo, não irá receber mais notificações da comunidade.*')
				.setFooter('2021 © Liga dos Programadores')
				.setTimestamp()

			message.channel.send(notifyEmbed3);
		}

		else {
			const notifyEmbedError = new Discord.MessageEmbed()
			.setColor("#29C9FC")
			.setAuthor('Ocorreu algum erro!')
			.setDescription('*Ocorreu algum erro. Contate a staff do servidor.*')
			.setFooter('2021 © Liga dos Programadores')
			.setTimestamp()

		message.channel.send(notifyEmbedError);
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