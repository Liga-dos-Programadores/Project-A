// LanguageManager
// Esse arquivo serve para organizar as linguagens de programacao para os cargos do servidor

const fs = require('fs')

class LanguageManager {
  // Metodo que retorna o conteudo do arquivo de configuracao das linguagens
  getLanguages () {
    var langs = fs.readFileSync('languages.json', 'utf8')
    return JSON.parse(langs)
  }
  // Adiciona uma linguagem ao arquivo
  addLanguage (name) {
    var langs = this.getLanguages()
    // se incluir a linguagem a ser adicionada, rejeitamos a promise
    if (langs.includes(name)) {
      return false
    }
    // Adicionamos a linguagem selecionada na array
    langs.push(name)
    // Salvamos o arquivo
    fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8')
    return true
  }
  // Remove uma linguagem do arquivo
  removeLanguage (name) {
    // Pegamos a array com as linguagens atuais
    var langs = this.getLanguages()
    // Pegamos o index do elemento a ser removido
    var idx = langs.indexOf(name)
    // Se a linguagem existir (index != -1)
    if (idx !== -1) {
      // Removemos a linguagem da array
      langs.splice(idx, 1)
    } else {
      // Se nao existir...
      return false
    }
    // Salvamos o arquivo
    fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8')
    return true
  }

  setMessage (id, channel) {
    let emojis = require('../emojiRole.json')
    emojis.id = id
    emojis.channel = channel
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  addEmoji (emoji, role) {
    let emojis = require('../emojiRole.json')
    emojis[emoji] = role
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  removeEmoji (emoji) {
    let emojis = require('../emojiRole.json')
    if (!emojis[emoji]) return
    delete emojis[emoji]
    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  async updateMsg (client) {
    let emojis = require('../emojiRole.json')
    const channel = client.channels.get(emojis.channel)
    const message = await channel.fetchMessage(emojis.id)
    const filtered = Object.keys(emojis).filter(key => (key !== 'id' && key !== 'channel'))
    const content = filtered.map(emoji => {
      const role = message.guild.roles.get(emojis[emoji])
      const rolename = role.name
      return `Reaja com ${client.emojis.get(emoji)} para obter o cargo **${rolename}**`
    })
    message.edit(content.join('\n'))
    filtered.forEach(emoji => message.react(client.emojis.get(emoji)))
  }
}

module.exports = LanguageManager
