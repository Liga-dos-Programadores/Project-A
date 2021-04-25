/**
  * O Comando "snippet" vai enviar uma mensagem ao usuário mostrando como deve ser enviado exemplo de linhas de código.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

	/**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

	run: function(client, message, args) {
    const embed = new Discord.MessageEmbed()
    .setTitle('A comunidade')
    .setDescription('[Site da Liga](https://liga-dos-programadores.github.io/), [GitHub da Liga](https://github.com/Liga-dos-Programadores)')
    .setImage('https://i.imgur.com/W2L4r1L.png')
    .setColor(process.env.COLOR)
    .setFooter('2021 © Liga dos Programadores.')
		.setTimestamp();
  message.channel.send(embed);
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
			name: 'liga',
			category: 'Informação',
			description: 'Template de como fazer uma pergunta.',
			usage: 'liga',
		};
	},
};