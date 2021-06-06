// O comando "reset" reseta a apresentação do membro.

require('dotenv').config();

module.exports = {
  run: async (client, message) => {
    const presentedRole = process.env.CARGO_APRESENTOU;
    const specialEmoji = message.guild.emojis.cache.find((emoji) => emoji.name == 'thinking') || '🤔';

    if (message.member.roles.cache.has(presentedRole)) {
      // Registra e checa se o canal de apresentações existe
      const channel = message.guild.channels.cache.find(
        (channel) => channel.id == process.env.CANAL_APRESENTACAO
      );
      if (channel) {
        // Faz um fetch de 100 mensagens no canal de apresentações
        const messages = await channel.messages.fetch({ limit: 100 });
        // Filtra as mensagens retornando apenas as enviadas pelo usuario
        const userMessages = messages.filter((m) => {
          return m.author === message.author && m.deletable;
        });
        // Verifica se a variavel acima tem elementos
        if (userMessages.array().length > 0) {
          // Se existirem mensagens do usuario remove todas as mensagens
          userMessages.forEach((message) => message.delete());
          // Remove o cargo
          message.member.roles.remove(presentedRole);
          // Envia uma mensagem confirmando a relmoção
          message.reply('sua apresentação foi removida! 🥳');
        } else {
          // Se nao existirem mensagens do usuario remove o cargo
          message.member.roles.remove(presentedRole);
          // envia uma mensagem
          message.reply(`não encontrei nenhuma mensagem sua no ${channel}! 🤯`);
        }
      } else {
        message.reply(
          `não consegui encontrar o canal de apresentacoes ${specialEmoji}`
        );
      }
    } else {
      message.reply(`você ainda não se apresentou! 😅`);
    }
  },

  conf: {
    onlyguilds: true
  },

  get help() {
    return {
      name: 'reset',
      category: 'Ajuda',
      description: 'Reseta o cargo de apresentação.',
      usage: '!reset'
    };
  },
};