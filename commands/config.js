// Comando resposanvel pela administracao do bot
const rolemanager = require('../utils/rolemanager')
const rolemgr = new rolemanager()

module.exports = {
  run: async (client, message, [option, value, value2]) => {
    /** Verifica se o membro possui permissão para administrar roles. */
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Você não pode fazer isto :c')

    if (!option) return message.reply(`talvez isso possa ajudá-lo(a): \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    const roles = require('../cargos.json')

    console.log(option)

    if (option === 'addrole' || option === 'remrole') {
      const shouldAdd = option === 'addrole'
      const exists = roles.includes(value)
      if (shouldAdd) {
        if (exists) return message.reply('Esse cargo já existe!')
        if (!message.guild.roles.find('name', value)) await message.guild.createRole({ value })
        if (!rolemgr.addrole(value)) return message.reply('Algo de errado não está certo. Não consegui adicionar esse cargo.')
        message.reply('Cargo removido.')
      } else {
        if (!exists) return message.reply('Esse cargo não existe!')
        const role = message.guild.roles.find('name', value)
        if (role) await role.delete()
        if (!rolemgr.removerole(value)) return message.reply('Algo de errado não está certo. Não consegui remover esse cargo.')
        message.reply('Cargo removido.')
      }
    } else if (option === 'rrmsg') {
      const rrmsg = await message.channel.send('Esta será a mensagem de role reaction.')
      rolemgr.setMessage(rrmsg.id, message.channel.id)
    } else if (option === 'rradd') {
      rolemgr.addEmoji(value, value2)
      rolemgr.updateMsg(client)
      message.reply('Emoji adicionado.')
    } else if (option === 'rrrem') {
      rolemgr.removeEmoji(value)
      rolemgr.updateMsg(client)
      message.reply('Emoji removido.')
    } else if (option === 'rrupd') {
      rolemgr.updateMsg(client)
      message.reply('Mensagem atualizada.')
    } else {
      return message.reply(`talvez isso possa ajudá-lo(a): \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
    }
  },

  conf: {
    onlyguilds: true
  },

  get help () {
    return {
      name: 'config',
      category: 'Moderação',
      description: 'Altera as configurações do bot.',
      usage: 'config [addrole (name|role)|remrole role]',
      admin: true
    }
  }
}
