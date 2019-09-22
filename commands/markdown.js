/**
 * O Comando "markdown" vai enviar uma mensagem ao usuário mostrando como o mesmo deve fazer uma markdown.
 */

module.exports = {
	/**
	* Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
	* Que passará os argumentos atraves do middleware que programamos.
	*/
	run: function (client, message, args) {
		// Criando embed que sera enviado para o usuário
		let embed = {
			title: 'Como usar o markdown?',
			description: 'O Markdown deve ser o mais fácil de ler e escrever o mais possível. A legibilidade, no entanto, é enfatizada acima de tudo.\n\n```md\n# Nome do projeto\n\nLorem ipsum dolor sit amet, *consectetur* adipiscing elit\nUt lacinia consequat semper. Phasellus **fringilla** tempus turpis, ac venenatis nisi efficitur.\n\n[link](url)```\n\n**Links:** \n[Aprenda Markdown](https://blog.da2k.com.br/2015/02/08/aprenda-markdown/)\n [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)\n  [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)',
			color: 0xB1103C
		}

		// Aqui será enviado o embed no canal que o usuário executo o comando
		message.channel.send({ embed })
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
			name: 'markdown',
			category: 'Moderação',
			description: 'Tutorial de como usar o markdown.',
			usage: `markdown`
		}
	}
}
