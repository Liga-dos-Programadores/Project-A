/**
	* O Comando "movemessage" vai mover uma mensagem do usuário de uma sala até outra, e em seguida apagar a anterior.
	* Para usar: "!movemessage [id da mensagem] [id do canal a ser enviado]"
*/

const { RichEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {

	/**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

	run: function(client, message, args) {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('você não tem permissão para usar esse comando!');

		// Criando embed que será enviado para o usuário
		const embed = new RichEmbed();
		// Buscando a mensagem que o bot vai mover
		message.channel.fetchMessage(args[0])
			.then(msg => {
				// Atribuindo a mensagem ao embed
				embed.setColor(process.env.COLOR)
					.setAuthor(msg.author.username, msg.author.avatarURL())
					.setDescription(msg.content)
					.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
					.setTimestamp();

				// Buscando o canal onde vai ser reposto
				client.channels.cache.find('id', args[1])
					// Enviando para o canal destino
					.send(`${msg.author} sua mensagem foi movida para esta sala!`, embed);

				// Deletando a mensagem no canal antigo
				msg.delete()
					.then(m => console.log(`Mensagem de ${m.author.username} movida`))
					.catch(err => console.warn(err));
			})
			// Caso o bot encontre algum problema
			.catch(err => {
				message.channel.send('Ops, foi digitado algo errado! Tente novamente...');
				console.warn(err);
			});
	},

	/**
    * Aqui podemos colocar mais algumas configurações do comando.
  */

	conf: {},

	/**
    * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'movemessage',
			category: 'mod',
			description: 'Acão de movimento de uma mensagem para outro canal.',
			usage: 'movemessage',
		};
	},
};