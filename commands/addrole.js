module.exports = {

  run: (client, message, args) => {

    //Verificamos se o usuario tem perm para usar esse comando
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
    return message.channel.send("> *Você não pode usar esse comando!*");

    /** Verificamos se o número de argumentos é válido. */
    if (args.length < 1) return message.reply(`olhe os cargos que eu tenho\: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    let roles = require('../cargos.json')
    let roleName = roles.map(l => l.toLowerCase()).find(l => l === args.join(' ').toLowerCase())
    let role = roleName && message.guild.roles.find(r => r.name.toLowerCase() === roleName)

    if (!role) {
      const emoji = message.guild.emojis.find('name', 'woman_shrugging')
      message.react(emoji || '🤷‍♀️')
      return message.reply(`não tenho esse cargo, olhe quais eu tenho: \`\`\` ${roles.join(' | ')}\`\`\``)
    }

    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro já possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.has(role.id)) {
      message.member.addRole(role)
      return message.reply(`*beep boop! Agora você possui o cargo **${role.name}**`)
    } else {
      return message.reply(`Você já possui esse cargo!`)
    }
  },

  /** Aqui podemos colocar mais algumas configurações do comando. */
  conf: {
    onlyguilds: true
  },

  /** Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc... */
  get help () {
    return {
      name: 'AddRole',
      category: 'Moderação',
      description: 'Adiciona um cargo',
      usage: `addrole [${require('../cargos.json').join('|')}]`
    }
  }

}
