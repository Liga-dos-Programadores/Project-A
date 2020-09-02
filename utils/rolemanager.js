const fs = require('fs')

class roleManager {
  // Adiciona uma linguagem ao arquivo
  addrole (name) {
    var roles = require('../cargos.json')

    if (roles.includes(name)) return false

    roles.push(name)

    fs.writeFileSync('cargos.json', JSON.stringify(roles), 'utf8')
    return true
  }

  removerole (name) {
    var roles = require('../cargos.json')

    var idx = roles.indexOf(name)

    if (idx === -1) return false

    roles.splice(idx, 1)

    fs.writeFileSync('cargos.json', JSON.stringify(roles), 'utf8')
    return true
  }

  setMessage (id, channel) {
    const emojis = require('../emojiRole.json')

    emojis.id = id
    emojis.channel = channel

    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  addEmoji (emoji, role) {
    const emojis = require('../emojiRole.json')

    emojis.emojis[emoji] = role

    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  removeEmoji (emoji) {
    const emojis = require('../emojiRole.json')

    if (!emojis.emojis[emoji]) return

    delete emojis.emojis[emoji]

    fs.writeFileSync('emojiRole.json', JSON.stringify(emojis), 'utf8')
  }

  async updateMsg (client) {
    const emojis = require('../emojiRole.json')

    const channel = client.channels.get(emojis.channel)
    const message = await channel.fetchMessage(emojis.id)

    const content = Object.keys(emojis.emojis).map(emoji => {
      const role = message.guild.roles.get(emojis.emojis[emoji])

      const actualEmoji = client.emojis.get(emoji)

      if (!role || !emoji) return this.removeEmoji(emoji)

      const rolename = role.name

      return `Reaja com ${actualEmoji} para obter o cargo **${rolename}**`
    })

    message.edit(content.join('\n'))

    Object.keys(emojis.emojis).forEach(emoji => message.react(client.emojis.get(emoji)))
  }
}

module.exports = roleManager
