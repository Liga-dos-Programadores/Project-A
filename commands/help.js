/**
 * O Comando Help envia uma mensagem de ajuda.
 * Contendo comandos e outras informações.
 */

module.exports = {
  run: (client, message, args) => {
    /** Objeto embed que irá ser enviado. */
    let embed = {
      color: 0xB1103C,
      title: 'PROJECT: A - Lista de comandos',
      url: 'https://github.com/Liga-dos-Programadores/Project-A',
      footer: {
        text: 'Não se esqueça de checar nosso código-fonte | 2020 ®Liga dos Programadores'
      },
      fields: []
    }

    let commands = client.commands

    if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin)

    commands.forEach(command => {
      if (command.alias) return
      embed.fields.push(
        {
          name: `> **${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: ${process.env.PREFIX}${command.help.usage}\n**Categoria**: ${command.help.category}`
        }
      )
    })

    message.author.send({ embed: embed })
      .then(() => message.react('⚡'))
      .catch(() => message.reply(`eu não tenho permissões para enviar DM para você 😥`))
  },

  conf: {},

  help: {
    name: 'help',
    category: 'Membro',
    description: 'Mostra todos os comandos disponíveis no bot.',
    usage: 'help'
  }
}
