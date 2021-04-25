/**
	* O Comando "mute" mutará determinado usuário temporariamente.
*/

const Discord = require('discord.js');
const ms = require('ms');

module.exports = {

	/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */

	run: async function(client, message, args) {
		message.delete();
		const msg = message;

		if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })); }

		const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		// eslint-disable-next-line no-shadow
		if (!tomute) return message.channel.send(`${message.author.username}, o uso correto do comando é: \`\`!mute @Membro tempo motivo\`\` .😅`).then(msg => msg.delete(5000));
		if (tomute.hasPermission('ADMINISTRATOR')) return message.reply('**você não pode mutar staffs! 😅**');
		
		const reason = args.slice(2).join(' ');
		if (!reason) return message.reply('**insira um motivo antes. 😶**');

		const muterole = msg.guild.roles.cache.find( role => role.name === 'Mutado' );

		const mutetime = args[1];
		if (!mutetime) return message.reply('**indique um tempo. ⌛️ (1s/1m/1h/1d)**');

		// eslint-disable-next-line no-empty-function
		message.delete().catch(() => { });

		try {
			tomute.send(`Você foi mutado por: ${mutetime}, no servidor ${message.guild.name}. O motivo é: ${reason}. 😶`);
		}
		catch (e) {
			message.channel.send(`${tomute} foi mutado por ${mutetime} `);
		}

		const muteembed = new Discord.MessageEmbed()
			.setAuthor('Mute 🤐')
			.setColor('#74c1ff')
			.addField('🔹 Membro', tomute, true)
			.addField('🔸 Staff', message.author.username, true)
			.setThumbnail(tomute.user.avatarURL(), true)
			.addField('⌛️ Tempo', mutetime, true)
			.addField('📃 Motivo', reason, true)
			.setFooter('2020 © Liga dos Programadores', 'https://i.imgur.com/U3gX6kU.png?3')
			.setTimestamp();

		msg.guild.channels.cache.get('737188926065737779').send(muteembed);
		

		await tomute.roles.add(muterole);

		if(!message.member.roles.cache.has(muterole)) {
			setTimeout(function() {
				if(!message.member.roles.cache.has(muterole)) return;
				tomute.roles.remove(muterole.id);
				msg.guild.channels.cache.get('735930352987799623').send(`<@${tomute.id}> **você foi desmutado! Comporte-se agora. 😁**`);
			}, ms(mutetime));
		}
	},

	conf: {},

	/**
   * Aqui exportamos Ajuda do comando como o seu nome categoria, descrição, etc...
  */

	get help() {
		return {
			name: 'mutar',
			description: 'Comando para mudar temporariamente um membro.',
			usage: '!mutar',
		};
	},
};