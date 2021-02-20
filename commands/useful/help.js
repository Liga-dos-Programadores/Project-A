/** O Comando "Help" envia uma mensagem de ajuda contendo as informações dos comandos. */

const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {

	run: (client, message) => {

		const sucess = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setAuthor('Minha lista de comandos 💡')
			.setDescription(` ${message.author}, enviei meus comandos em seu privado!`)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();
		message.channel.send(sucess);

		const embedList = new MessageEmbed()
			.setColor(process.env.COLOR)
			.setAuthor('Minha lista de comandos 💡')
			.setDescription('Para saber sobre cada um, reaja ao emoji de cada categoria.')
			.addField('📋 **Informações**', '*Comandos que mostram algumas informações importantes.*')
			.addField('💻 **Codando**', '*Comandos que auxiliam ao codificar.*')
			.addField('⚙️ **Úteis**', '*Comandos que ajudam o servidor.*')
			.addField('🔒 **Mod**', '*Comandos da staff.*')
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

		message.author.send(embedList)
			.then(async msg => {
				await msg.react('📋');
				await msg.react('💻');
				await msg.react('⚙️');
				await msg.react('🔒');
				await msg.react('↩');

				const info = (reaction, user) => reaction.emoji.name === '📋';
				const codando = (reaction, user) => reaction.emoji.name === '💻';
				const uteis = (reaction, user) => reaction.emoji.name === '⚙️';
				const mod = (reaction, user) => reaction.emoji.name === '🔹';
				const back = (reaction, user) => reaction.emoji.name === '🔙';

				const infoL = msg.createReactionCollector(info);
				const codandoL = msg.createReactionCollector(codando);
				const uteisL = msg.createReactionCollector(uteis);
				const modL = msg.createReactionCollector(mod);
				const backL = msg.createReactionCollector(back);

				backL.on('collect', () => {
					const embedBack = new MessageEmbed()
						.setColor(process.env.COLOR)
						.setAuthor('Minha lista de comandos 💡')
						.setDescription('Para saber sobre cada um, reaja ao emoji de cada categoria.')
						.addField('📋 **Informações**', '*Comandos que mostram algumas informações importantes.*')
						.addField('💻 **Codando**', '*Comandos que auxiliam ao codificar.*')
						.addField('⚙️ **Úteis**', '*Comandos que ajudam o servidor.*')
						.addField('🔒 **Mod**', '*Comandos da staff.*')
						.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
						.setTimestamp();
					msg.edit(embedBack);

				});

				infoL.on('collect', () => {
					const embedInfo = new MessageEmbed()
						.setColor(process.env.COLOR)
						.setAuthor('Minha lista de comandos 💡')
						.setDescription(`⭐ **Info**
							!avatar - Exibe o avatar.
							!botinfo - Mostra informações do bot.
							!serverinfo - Mostra informações do servidor.
							!ping - Mostra latência do bot.
							!invite - Mostra o rank de convites.
							!notify - Recebe o cargo novidades/ Remove o cargo.
							!userinfo - Mostra informações do usuário.
						`)
						.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
						.setTimestamp();
					msg.edit(embedInfo);
				});

				codandoL.on('collect', () => {
					const embedCod = new MessageEmbed()
						.setColor(process.env.COLOR)
						.setAuthor('Minha lista de comandos 💡')
						.setDescription(`⭐ **Info**
							!avatar - Exibe o avatar.
							!botinfo - Mostra informações do bot.
							!serverinfo - Mostra informações do servidor.
							!ping - Mostra latência do bot.
							!invite - Mostra o rank de convites.
							!notify - Recebe o cargo novidades/ Remove o cargo.
							!userinfo - Mostra informações do usuário.
						`)
						.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
						.setTimestamp();
					msg.edit(embedCod);
				});

				uteisL.on('collect', () => {
					const embedUtil = new MessageEmbed()
						.setColor(process.env.COLOR)
						.setAuthor('Minha lista de comandos 💡')
						.setDescription(`⭐ **Info**
							!avatar - Exibe o avatar.
							!botinfo - Mostra informações do bot.
							!serverinfo - Mostra informações do servidor.
							!ping - Mostra latência do bot.
							!invite - Mostra o rank de convites.
							!notify - Recebe o cargo novidades/ Remove o cargo.
							!userinfo - Mostra informações do usuário.
						`)
						.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
						.setTimestamp();
					msg.edit(embedUtil);
				});

				modL.on('collect', () => {
					const embedMod = new MessageEmbed()
						.setColor(process.env.COLOR)
						.setAuthor('Minha lista de comandos 💡')
						.setDescription(`⭐ **Info**
							!avatar - Exibe o avatar.
							!botinfo - Mostra informações do bot.
							!serverinfo - Mostra informações do servidor.
							!ping - Mostra latência do bot.
							!invite - Mostra o rank de convites.
							!notify - Recebe o cargo novidades/ Remove o cargo.
							!userinfo - Mostra informações do usuário.
						`)
						.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
						.setTimestamp();
					msg.edit(embedMod);
				});
			})
			.catch(error => message.channel.send(error));
	},

	conf: {},

	help: {
		name: 'help',
		category: 'Ajuda',
		description: 'Mostra todos os comandos disponíveis do bot.',
		usage: 'help',
	},
};