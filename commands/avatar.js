/**
 * O Comando "avatar" mostrará a imagem de perfil do usuário ou do bot
 */

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
  */
  run: function (client, message, args) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `> **Seu** avatar 🖼 ${message.author.displayAvatarURL}`
      )
    }
    const avatarList = message.mentions.users.map(
      user => `> **${user.username}'s** avatar 🖼 ${user.displayAvatarURL}`
    )

    return message.channel.send(avatarList)
  },

  conf: {},

  /**
   * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
   */
  get help () {
    return {
      name: 'avatar',
      category: 'Info',
      description: 'Mostra o avatar do usuário ou de um bot.',
      usage: 'avatar'
    }
  }
}
