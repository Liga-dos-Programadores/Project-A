const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    message.reply('Boa noite! 🌙')
  },

  conf: {},

  get help () {
    return {
      name: 'boanoite',
      description: 'Envia uma mensagem de boa noite.',
      usage: 'boanoite',
      category: 'Diversão'
    }
  }
}