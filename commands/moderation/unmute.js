/**
 * O Comando "unmute" desmutará determinado usuário.
 */

const Discord = require('discord.js');

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {
		if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não tem permissão para usar esse comando! 🤨'); }

		const msg = message;

		if (message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {
			const unmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			const muterole = message.guild.roles.cache.find(role => role.name === 'Mutado');

			if (!unmute) {
				return message.channel.send(new Discord.RichEmbed()
					.setColor('#74c1ff')
					.setTitle('Uso incorreto do comando 😅')
					.setDescription(`*${message.author.username}, o uso correto do comando é: \`\`!unmute @Membro\`\`.*`));
			}

			if (unmute.hasPermission('ADMINISTRATOR')) return message.reply('**você não pode desmutar staffs! 😅**');

			if (unmute.roles.has(muterole.id)) {
				unmute.roles.remove(muterole.id);

				const unmuteembed = new Discord.RichEmbed()
					.setColor('#74c1ff')
					.setAuthor('Desmute 😀')
					.setDescription(`**${unmute.displayName}** foi desmutado(a) por ${message.author.username} 🙏.`)
					.setFooter('2020 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=5000,height=100')
					.setTimestamp();

				msg.guild.channels.get('737188926065737779').send(unmuteembed);
			}
			else {
				return message.channel.send(new Discord.RichEmbed()
					.setDescription(`**${unmute.displayName}** não está mutado. 🤔`)
					.setColor('#74c1ff'));
			}
		}

	},


	//   if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não tem permissão para usar esse comando! 🤨'); }
	//   // Se o membro não tem permissão de admnistrador ou de gerenciar mensagens ele não pode usar o comando

	//   let unmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	//   let muterole = message.guild.roles.cache.find(role => role.name === 'Mutado');

	//   if (!unmute) {
	//     return message.channel.send(new Discord.RichEmbed()
	//         .setColor('#74c1ff')
	//         .setTitle("Uso incorreto do comando")
	//         .setDescription("Tente usar ``" + `${c.prefix}${this.help.name} ${this.help.arg}` + "``");
	//   }

	//   if (unmute.roles.has(muterole.id)) {
	//     unmute.roles.remove(muterole.id);
	//     return client.channels.get('737188926065737779').send(new Discord.RichEmbed()
	//         .setTitle(`**${unmute.displayName}** foi desmutado.`)
	//         .setColor("RANDOM")
	//         .setFooter(`Usuário desmutado por ${message.author.username}`)
	//         .setTimestamp());
	//   } else {
	//     return message.channel.send(new Discord.RichEmbed()
	//         .setTitle(`**${unmute.displayName}** não está mutado.`)
	//         .setColor("RANDOM"));
	//   }

	// }

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
   */

	get help() {
		return {
			name: 'unmute',
			description: 'O Comando "unmute" desmutará determinado usuário.',
			usage: 'unmute',
		};
	},
};