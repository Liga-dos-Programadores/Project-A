/**
 * O Comando "ban" banirá o usuário.
*/

const Discord = require('discord.js');

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   	* Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {
		const user = message.mentions.users.first() || args[0];
		const reason = args.slice(1).join(' ');

		const embed = new Discord.MessageEmbed()
			.setColor(process.env.COLOR)
			.setAuthor('Banimento')
			.setThumbnail(user.avatarURL())
			.setDescription(`Para banir o usuário por:\n${reason}\nclique na reção ✅ se não ❌`)
			.setFooter('2020 © Liga dos Programadores', process.env.SERVERIMAGE)
			.setTimestamp();

		if (!user) return message.channel.send('faltou o usuário');
		if (!reason) return message.channel.send('faltou o motivo');

		const filter = (reaction, userFilter) => {
			return ['✅', '❌'].includes(reaction.emoji.name) && userFilter.id === message.author.id;
		};

		message.channel.send(embed).then(async msg => {
			await msg.react('✅');
			await msg.react('❌');

			msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(collected => {
					const reaction = collected.first();

					if (reaction.emoji.name === '✅') {
						message.guild.members.ban(user)
							.then(() => message.reply('Ban!'))
							.catch(() => message.channel.send('Não foi possível banir o usário!'));
					}
					else {
						msg.delete();
					}
				})
				.catch(() => {
					message.reply('Não deu react!');
				});
		});
	},
	conf: {},

	get help() {
		return {
			name: 'ban',
			description: 'O Comando "ban" bane o usuário do servidor.',
			usage: '!ban @usuário motivo',
		};
	},
};