const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    const embed = new Discord.RichEmbed()
      .setAuthor(`🏓 ${Math.round(client.ping)}ms`)
      .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

    message.channel.send(embed)
  },

  conf: {},

  get help () {
    return {
      name: 'ping',
      description: 'Mostra a latência do bot.',
      usage: 'ping',
      category: 'Info'
    }
  }
}
