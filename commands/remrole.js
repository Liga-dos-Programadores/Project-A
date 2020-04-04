/**
 * O Comando "remrole" removerá os cargos de programação dos membros.
 */

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
 * Que passará os argumentos atraves do middleware que programamos.
 */
  run: (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> *Você não pode usar esse comando!*') }

    /** Verificamos se o número de argumentos é válido. */
    if (args.length < 1) return message.reply(`talvez isso possa ajudá-lo(a): \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    const roles = require('../cargos.json')
    const roleName = roles.map(l => l.toLowerCase()).find(l => l === args.join(' ').toLowerCase())
    const role = roleName && message.guild.roles.find(r => r.name.toLowerCase() === roleName)

    if (!role) {
      const emoji = message.guild.emojis.find('name', 'thonk')
      message.react(emoji || '🤔')
      return message.reply(`talvez isso possa ajudá-lo(a): \`\`\`${process.env.PREFIX}addrole [${roles.join('|')}]\`\`\``)
    }

    /** Logo então removemos o cargo do membro e mandamos uma mensagem como resposta
     * Caso o membro não possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.has(role.id)) {
      return message.reply('Você não possui esse cargo!')
    } else {
      message.member.removeRole(role)
      return message.reply(`**beep boop!** Agora você não possui mais o cargo **${role.name}**`)
    }
  },

  /** Aqui podemos colocar mais algumas configurações do comando. */
  conf: {
    onlyguilds: true
  },

  /** Aqui exportamos ajuda do comando como o seu nome categoria descrição etc... */
  get help () {
    return {
      name: 'remrole',
      category: 'Moderação',
      description: 'Remove um cargo de si próprio.',
      usage: `remrole [${require('../cargos.json').join('|')}]`,
      admin: true
    }
  }
}
