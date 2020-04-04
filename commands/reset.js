// Esse comando serve para usuarios que querem resetar sua apresentacao no chat #apresente-se para criar uma nova

module.exports = {
  run: async (client, message, args) => {
    if (message.member.roles.exists('name', 'Apresentado')) {
      // Registra e checa se o canal Apresente-se existe
      var channel = message.guild.channels.find('id', process.env.APRESENTACAO)
      if (channel) {
        // Faz um fetch de 100 mensagens no canal apresente-se
        const messages = await channel.fetchMessages({ limit: 100 })
        // Filtra as mensagens retornando apenas as enviadas pelo usuario
        var usrMessages = messages.filter((m) => {
          return (m.author === message.author && m.deletable)
        })
        // Verifica se a variavel acima tem elementos
        if (usrMessages.array().length !== 0) {
          // se existirem mensagens do usuario...
          usrMessages.deleteAll() // remove todas as mensagens
          message.member.removeRole(message.guild.roles.find('name', 'Apresentado')) // remove o cargo/role
          message.reply('sua apresentação foi removida!') // envia uma mensagem
        } else {
          // se nao existirem mensagens do usuario...
          message.member.removeRole(message.guild.roles.find('name', 'Apresentado')) // remove o cargo/role
          message.reply(`não encontrei nenhuma mensagem sua no ${channel}.`) // envia uma mensagem
        }
      } else {
        // Verifica se existe o emoji especial do servidor (:thonk:) e se nao existir substitui pelo :thinking:
        const specialemoji = message.guild.emojis.find('name', 'thonk')
        message.reply(`não consegui encontrar o canal de apresentacoes ${specialemoji || '🤔'}`)
      }
    } else {
      // Verifica se existe o emoji especial do servidor (:thonk:) e se nao existir substitui pelo :thinking:
      const specialemoji = message.guild.emojis.find('name', 'thonk')
      message.reply(`${specialemoji || '🤔'} voce ainda não se apresentou!`)
    }
  },

  conf: {
    onlyguilds: true
  },

  get help () {
    return {
      name: 'reset',
      category: 'Ajuda',
      description: 'Reseta o status de apresentação.'
    }
  }
}
