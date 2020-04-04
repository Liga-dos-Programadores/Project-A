/**
 * O Comando "addrole" adicionará os cargos aos membros
 */

module.exports = {

  /** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
   * Que passará os argumentos atraves do middleware que programamos.
   */
  run: (client, message, args) => {
    // Verificamos se o usuario tem permissão para usar esse comando
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) {
      return message.channel.send('> *Você não pode usar esse comando!*')
    }

    /** Verificamos se o número de argumentos é válido. */
    if (args.length < 1) return message.reply(`olhe os cargos que eu tenho: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    const roles = require('../cargos.json')
    const roleName = roles.map(l => l.toLowerCase()).find(l => l === args.join(' ').toLowerCase())
    const role = roleName && message.guild.roles.find(r => r.name.toLowerCase() === roleName)

    if (!role) {
      const emoji = message.guild.emojis.find('name', 'grey_question')
      message.react(emoji || '❔')
      return message.reply('ou esse cargo não tem no servidor ou foi escrito de maneira errada!')
    }

    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro já possua o cargo então é enviada uma mensagem retornando.
     */

    if (!message.member.roles.has(role.id)) {
      message.member.addRole(role)
      return message.reply(`agora você possui o cargo **${role.name}** 👏`)
    } else {
      return message.reply('você já possui esse cargo!')
    }
  },

  /** Aqui podemos colocar mais algumas configurações do comando. */
  conf: {
    onlyguilds: true
  },

  // Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc.
  get help () {
    return {
      name: 'addrole',
      description: 'Adiciona um cargo',
      category: 'Moderação',
      usage: `addrole [${require('../cargos.json').join('|')}]`,
      admin: true
    }
  }
}
