/** Comando remove responsavel por apagar mensagens de um canal
 * O Maximo de mensagens que o bot pode apagar por vez é 100.
 */

exports.run = (client, message, args) => {
  // Verificamos se o objeto "member" existe, pode ser que o usuario esteja num chat privado
  if (!message.member) return

  /** Verifica se o membro possui permissão para administrar mensagens. */
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Você não pode fazer isto :c')
  /** Verifica se é a quantidade de argumentos correta
     * Se nenhum argumento for passado então remova 100 mensagens
     * Se 1 argumento for passado então remove esse numero
     * Se mais de um argumento for passado então retorne a mensagem.
     */
  var limit = 100
  if (args.length === 1) {
    limit = parseInt(args[0])
  } else {
    return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
  }
  /** Verifica se um numero foi passado como argumento. */
  if (!Number.isInteger(limit)) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
  /** Então irá aumentar um numero para a mensagem de comando ser apagada junto com as outras. */
  limit++
  /** Limita que o numero de mensagens seja maior que 100 */
  limit = Math.min(limit, 99)

  /** Seleciona todas as mensagens conforme o limite */
  message.channel.fetchMessages({ limit })
    .then(messages => {
      /** Armazena a variavel com as mensagens deletadas e depois deleta todas as mensagens encontradas. */
      let deleted = messages.size - 1
      message.channel.bulkDelete(messages)
      /** Assim depois envia uma mensagem com a quantidade de mensagens deletadas que é excluida apos 2 segundos. */
      message.channel.send(`**${deleted}** mensagens foram deletadas.`)
        .then(message => setTimeout(() => message.delete(), 2000))
    })
}

exports.conf = {

}

exports.help = {
  name: 'bulk',
  categorie: 'Moderação',
  description: 'Apaga mensagens de um canal.',
  usage: 'bulk [1 - 100]'
}
