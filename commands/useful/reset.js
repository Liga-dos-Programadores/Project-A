// O comando "reset" serve para usuarios que querem resetar sua apresentação.

module.exports = {
	run: async (client, message) => {
		const memberRole = message.member.roles.cache.get(process.env.ID_ROLE_APRESENTACAO)
		if (!memberRole)
			return message.reply("🤔 voce ainda não se apresentou!");

		// Registra e checa se o canal Apresente-se existe
		const channel = message.guild.channels.cache.get(process.env.APRESENTACAO);
		if (!channel)
			return message.reply(`não consegui encontrar o canal de apresentacoes 🤔`);

		// Faz um fetch de 100 mensagens no canal apresente-se
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
			message.member.roles.remove(memberRole);
			// envia uma mensagem
			return message.reply('sua apresentação foi removida!');
		}
		else {
			// se nao existirem mensagens do usuario...
			// remove o cargo/role
			message.member.roles.remove(memberRole);
			// envia uma mensagem
			return message.reply(`não encontrei nenhuma mensagem sua no ${channel}.`);
		}

	},

	conf: {
		onlyguilds: true,
	},

	get help() {
		return {
			name: 'reset',
			category: 'Ajuda',
			description: 'Reseta o status de apresentação.',
		};
	},
};
