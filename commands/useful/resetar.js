// O comando "reset" serve para usuarios que querem resetar sua apresentação.

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
	run: async (client, message) => {
		const apresentedRole = message.member.roles.cache.get(process.env.APRESENTOU)
		const apresentChannel = message.guild.channels.cache.get(process.env.APRESENTACAO);

		if(!apresentedRole) {
			const apresentEmbed1 = new Discord.MessageEmbed()
				.setColor("#29C9FC")
				.setAuthor('Não foi encontrado o id do cargo ou ele não existe no servidor!')
				.setFooter('2021 © Liga dos Programadores')
				.setTimestamp()
			message.channel.send(apresentEmbed1);

			return;
		} 

		if (!message.member.roles.cache.has(process.env.APRESENTOU)) {
			const apresentEmbed2 = new Discord.MessageEmbed()
			.setColor("#29C9FC")
			.setAuthor('você não se apresentou!')
			.setDescription('Apresente-se para obter o cargo.')
			.setFooter('2021 © Liga dos Programadores')
			.setTimestamp();

			message.channel.send(apresentEmbed2);			
		}

		if (!apresentChannel) {
			const apresentEmbed3 = new Discord.MessageEmbed()
			.setColor("#29C9FC")
			.setAuthor('Canal não encontrado!')
			.setDescription('Canal de apresentaçõs não encontrado!')
			.setFooter('2021 © Liga dos Programadores')
			.setTimestamp();

			message.channel.send(apresentEmbed3);			
		}

		const messages = await channel.messages.fetch({ limit: 100 });
		// Filtra as mensagens retornando apenas as enviadas pelo usuario
		const usrMessages = messages.filter((m) => {
			return (m.author === message.author && m.deletable);
		});
		// Verifica se a variavel acima tem elementos
		if (usrMessages.array().length !== 0) {
			// se existirem mensagens do usuario...
			// remove todas as mensagens
			channel.bulkDelete(usrMessages);
			// remove o cargo/rolea
			message.member.roles.remove(process.env.APRESENTOU);
			// envia uma mensagem
			return message.reply('sua apresentação foi removida!');
		}
		else {
			// se nao existirem mensagens do usuario...
			// remove o cargo/role
			message.member.roles.remove(memberRole);
			// envia uma mensagem
			return message.reply(`não encontrei nenhuma mensagem sua no ${apresentChannel}.`);
		}

	},

	conf: {
		onlyguilds: true,
	},

	get help() {
		return {
			name: 'resetar',
			category: 'Ajuda',
			description: 'Reseta o status de apresentação.',
			usage: 'resetar'
		};
	},
};
