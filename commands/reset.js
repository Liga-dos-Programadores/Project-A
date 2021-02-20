// O comando "reset" serve para usuarios que querem resetar sua apresentação.

module.exports = {
	run: async (client, message) => {
		if (message.member.roles.cache.some('name', 'Apresentado')) {
			// Registra e checa se o canal Apresente-se existe
			const channel = message.guild.channels.cache.find('id', process.env.APRESENTACAO);
			if (channel) {
				// Faz um fetch de 100 mensagens no canal apresente-se
				const messages = await channel.fetchMessages({ limit: 100 });
				// Filtra as mensagens retornando apenas as enviadas pelo usuario
				const usrMessages = messages.filter((m) => {
					return (m.author === message.author && m.deletable);
				});
				// Verifica se a variavel acima tem elementos
				if (usrMessages.array().length !== 0) {
					// se existirem mensagens do usuario...
					// remove todas as mensagens
					usrMessages.deleteAll();
					// remove o cargo/rolea
					message.member.roles.remove(message.guild.roles.cache.find('name', 'Apresentado'));
					// envia uma mensagem
					message.reply('sua apresentação foi removida!');
				}
				else {
					// se nao existirem mensagens do usuario...
					// remove o cargo/role
					message.member.roles.remove(message.guild.roles.cache.find('name', 'Apresentado'));
					// envia uma mensagem
					message.reply(`não encontrei nenhuma mensagem sua no ${channel}.`);
				}
			}
			else {
				// Verifica se existe o emoji especial do servidor (:thonk:) e se nao existir substitui pelo :thinking:
				const specialemoji = message.guild.emojis.cache.find('name', 'thonk');
				message.reply(`não consegui encontrar o canal de apresentacoes ${specialemoji || '🤔'}`);
			}
		}
		else {
			// Verifica se existe o emoji especial do servidor (:thonk:) e se nao existir substitui pelo :thinking:
			const specialemoji = message.guild.emojis.cache.find('name', 'thonk');
			message.reply(`${specialemoji || '🤔'} voce ainda não se apresentou!`);
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
