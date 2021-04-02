// O comando "reset" serve para usuarios que querem resetar sua apresentação.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  run: async (client, message) => {
    const presentedRole = process.env.CARGO_APRESENTOU;
    // Verifica se existe o emoji especial do servidor (:thonk:) e se nao existir substitui pelo :thinking:
    const specialEmoji =
      message.guild.emojis.cache.find((emoji) => emoji.name == 'thonk') || '🤔';

    if (message.member.roles.cache.has(presentedRole)) {
      // Registra e checa se o canal Apresente-se existe
      const channel = message.guild.channels.cache.find(
        (channel) => channel.id == process.env.CANAL_APRESENTACAO
      );
      if (channel) {
        // Faz um fetch de 100 mensagens no canal apresente-se
        const messages = await channel.messages.fetch({ limit: 100 });
        // Filtra as mensagens retornando apenas as enviadas pelo usuario
        const userMessages = messages.filter((m) => {
          return m.author === message.author && m.deletable;
        });
        // Verifica se a variavel acima tem elementos
        if (userMessages.array().length > 0) {
          // se existirem mensagens do usuario...
          // remove todas as mensagens
          userMessages.forEach((message) => message.delete());
          // remove o cargo/rolea
          message.member.roles.remove(presentedRole);
          // envia uma mensagem
          message.reply('sua apresentação foi removida! 🥳');
        } else {
          // se nao existirem mensagens do usuario...
          // remove o cargo/role
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
      name: 'resetar',
      category: 'Ajuda',
      description: 'Reseta o status de apresentação.',
      usage: 'resetar'
    };
  },
};