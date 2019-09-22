// LanguageManager
// Esse arquivo serve para organizar as linguagens de programacao para os cargos do servidor

const fs = require('fs')

class LanguageManager {
  // Adiciona uma linguagem ao arquivo
  addLanguage (name) {
    var langs = require('../languages.json')
    // se incluir a linguagem a ser adicionada, rejeitamos a promise
    if (langs.includes(name)) return false
    // Adicionamos a linguagem selecionada na array
    langs.push(name)
    // Salvamos o arquivo
    fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8')
    return true
  }

  // Remove uma linguagem do arquivo
  removeLanguage (name) {
    // Pegamos a array com as linguagens atuais
    var langs = require('../languages.json')
    // Pegamos o index do elemento a ser removido
    var idx = langs.indexOf(name)
    // Se a linguagem não existir terminamos a execução
    if (idx === -1) return false
    // Se existir, removemos a entry da array
    langs.splice(idx, 1)
    // Salvamos o arquivo
    fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8')
    return true
  }

  // Configura a mensagem de reaction-role
  setMessage (id, channel) {
    // Importamos o arquivo de configuração
    const emojis = require('../emojiRole.json')
    // Setamos o ID da mensagem e do canal
    emojis.id = id
    emojis.channel = channel
    // Salvamos o arquivo
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  // Adiciona um emoji / role para a lista
  addEmoji (emoji, role) {
    // Importamos o arquivo de configuração
    const emojis = require('../emojiRole.json')
    // Adicionamos o emoji ao objeto "emojis"
    emojis.emojis[emoji] = role
    // Salvamos o arquivo
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  // Remove um emoji da lista
  removeEmoji (emoji) {
    // Importamos o arquivo de configuração
    const emojis = require('../emojiRole.json')
    // Se não existir esse emoji, cancelamos a execução
    if (!emojis.emojis[emoji]) return
    // Deleta o emoji da array
    delete emojis.emojis[emoji]
    // Salva o arquivo
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  // Função para atualizar a mensagem de reaction role
  async updateMsg (client) {
    // Importamos o arquivo de configuração
    const emojis = require('../emojiRole.json')
    // Pegamos o canal e a mensagem
    const channel = client.channels.get(emojis.channel)
    const message = await channel.fetchMessage(emojis.id)
    // Aqui, nós geramos uma array com cada linha da mensagem de reaction role.
    const content = Object.keys(emojis.emojis).map(emoji => {
      // Pegamos a role
      const role = message.guild.roles.get(emojis.emojis[emoji])
      // Pegamos o emoji
      const actualEmoji = client.emojis.get(emoji)
      // Se algum dos dois não existir, cancelamos a execução e removemos o emoji
      if (!role || !emoji) return this.removeEmoji(emoji)
      // Pegamos o nome da role
      const rolename = role.name
      // Retornamos o conteudo da linha
      return `Reaja com ${actualEmoji} para obter o cargo **${rolename}**`
    })
    // Juntamos a array em uma string com o separador \n, que é um linebreak e editamos a mensagem
    message.edit(content.join('\n'))
    // Reagimos na mensagem com cada emoji da lista
    Object.keys(emojis.emojis).forEach(emoji => message.react(client.emojis.get(emoji)))
  }
}

module.exports = LanguageManager
