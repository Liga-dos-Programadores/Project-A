module.exports = {

  run: (client, message, args) => {
    /** Verificamos se o numero de argumentos é o correto. */
    if (!(args.length === 0)) return message.reply(`talvez isso possa ajudá-lo(a): \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    let role = message.guild.roles.find('Novidades')

    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro ja possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.exists(role.name)) {
      message.member.addRole(role)
      return message.reply(`*beep boop! Agora você sempre será notificado quando houver novidades no servidor!`)
    } else {
      return message.reply(`Ei! Você já possui este cargo.`)
    }
  },

  /** Aqui podemos colocar mais algumas configurações do comando. */
  conf: {
    onlyguilds: true
  },

  /** Aqui exportamos ajuda do comando como o seu nome categoria descrição etc... */
  get help () {
    return {
      name: 'Novidades',
      category: 'Membros',
      description: 'Adiciona o cargo de novidades a si mesmo.',
      usage: 'novidades'
    }
  }
}
