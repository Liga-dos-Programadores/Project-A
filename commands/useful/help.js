/** O Comando "Help" envia uma mensagem de ajuda contendo as informações dos comandos. */

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	run: (client, message) => {

		if (message.channel.type !== 'dm') {
			const error = new Discord.RichEmbed()
				.setColor(process.env.COLOR)
				.setAuthor('Não foi possível')
				.setDescription(`${message.author}, não consigo enviar mensagem para você, ative suas mensagens diretas!`)
				.setThumbnail(client.user.avatarURL())
				.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
				.setTimestamp();
			message.channel.send(error);
		}

		if (message.channel.type === 'dm') {
			const sucess = new Discord.RichEmbed()
				.setColor(process.env.COLOR)
				.setAuthor('Minha lista de comandos 💡')
				.setDescription(` ${message.author}, enviei meus comandos em seu privado!`)
				.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
				.setTimestamp();
			message.channel.send(sucess);
		}

		const embedList = new Discord.RichEmbed()
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
			.catch(message.channel.send(error))
			.then(async msg => {
				await msg.react('📋');
				await msg.react('💻');
				await msg.react('⚙️');
				await msg.react('🔒');
				await msg.react('↩');

				const info = (reaction, user) => reaction.emoji.name === '📋' && user.id === message.author.id;
				const codando = (reaction, user) => reaction.emoji.name === '💻' && user.id === message.author.id;
				const uteis = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;
				const mod = (reaction, user) => reaction.emoji.name === '🔹' && user.id === message.author.id;
				const back = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;

				const infoL = msg.createReactionCollector(info);
				const codandoL = msg.createReactionCollector(codando);
				const uteisL = msg.createReactionCollector(uteis);
				const modL = msg.createReactionCollector(mod);

				const backL = msg.createReactionCollector(back);

				backL.on('collect', () => {
					const embedBack = new Discord.RichEmbed()
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
					const embedInfo = new Discord.RichEmbed()
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
					const embedCod = new Discord.RichEmbed()
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
					const embedUtil = new Discord.RichEmbed()
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
					const embedMod = new Discord.RichEmbed()
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
			});
	},

	conf: {},

	help: {
		name: 'help',
		category: 'Ajuda',
		description: 'Mostra todos os comandos disponíveis do bot.',
		usage: 'help',
	},
};