const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    message.reply('Bom dia! ☀️')
  },

  conf: {},

  get help () {
    return {
      name: 'bomdia',
      description: 'Envia uma mensagem de bom dia.',
      usage: 'bomdia',
      category: 'Diversão'
    }
  }
}