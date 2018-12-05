// Comando resposanvel pela administracao do bot
const Langmgr = require('../utils/languagemanager')
const langmgr = new Langmgr()

module.exports = {
  run: async (client, message, [ option, value ]) => {
    /** Verifica se o membro possui permissão para administrar roles. */
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Você não pode fazer isto :c')

    if (!option || !value) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    const langs = langmgr.getLanguages()

    if (option === 'addlang' || option === 'remlang') {
      const shouldAdd = option === 'addlang'
      const exists = langs.includes(value)
      if (shouldAdd) {
        if (exists) return message.reply('Essa linguagem já existe!')
        if (!message.guild.roles.find('name', value)) await message.guild.createRole({ value })
        if (!langmgr.addLanguage(value)) return message.reply('Algo de errado não está certo. Não consegui adicionar essa linguagem.')
        message.reply('Linguagem adicionada.')
      } else {
        if (!exists) return message.reply('Essa linguagem não existe!')
        const role = message.guild.roles.find('name', value)
        if (role) await role.delete()
        if (!langmgr.removeLanguage(value)) return message.reply('Algo de errado não está certo. Não consegui remover essa linguagem.')
        message.reply('Linguagem removida.')
      }
    } else {
      return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
    }
  },

  conf: {
    onlyguilds: true
  },

  get help () {
    return {
      name: 'config',
      categorie: 'Moderação',
      description: 'Altera as configurações do bot.',
      usage: 'config [addlang (name|role)|remlang role]'
    }
  }

}
