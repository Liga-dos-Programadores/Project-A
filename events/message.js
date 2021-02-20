/**
 * O Evento message é emitido toda vez que o bot recebe uma mensagem.
 * Podemos usar este evento como uma espécie de middleware para impedir vulnarabilidades ou outras coisas.
 */

const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  /** É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
   * E Também não entrara em um loop de spam...
   */
  if (message.author.bot) return

  // Checamos se a mensagem é do canal #apresente-se
  if (message.channel.id === process.env.APRESENTACAO) {

    // Checamos se o usuario tem a role "Apresentado"
    const memberHaveRole = message.member.roles.cache.get(process.env.ID_ROLE_APRESENTACAO)

    if (!memberHaveRole) {
      // Se nao tiver, adicionamos ela
      const serverRole = message.guild.roles.cache.get(process.env.ID_ROLE_APRESENTACAO)

      message.member.roles.add(serverRole)
        .catch(err => {
          message.reply("Infelizmente ocorreu algum erro, procure um admin!")
          console.error(err)
        })

      const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'liga')
      return message.react(emoji)
        .catch(err => {
          message.reply("Infelizmente ocorreu algum erro, procure um admin!")
          console.error(err)
        })

    }

    // Se ja tiver, a mensagem e considerada como spam e é removida
    // Define um objeto especificando o embed

    const embed = new MessageEmbed()
      .setColor(16739451)
      .setTitle("Como resetar seu status de apresentação:")
      .setDescription("**Hfey**, caso você tenha errado a digitação de algo em sua mensagem de apresentação, basta digitar o comando `p!reset` no *chat de comandos do servidor* para resetar a sua apresentação!")

    return message.author.send(embed)
      .catch(() => message.reply('me desculpe, mas eu não tenho permissões para enviar DM para você!'))

  }

  if ([process.env.SUGESTOES, process.env.PROJETOS].includes(message.channel.id) && !message.content.startsWith('^')) {
    const guildRoleCache = message.guild.emojis.cache

    const upvote = guildRoleCache.get(process.env.ID_UPVOTE_ROLE)
    const donwvote = guildRoleCache.get(process.env.ID_DOWNVOTE_ROLE)

    return Promise.all([
      message.react(upvote),
      message.react(donwvote)
    ])
  }

  if (message.channel.id === process.env.DESAFIOS) {
    return await message.react('✅')
  }

  /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
   * OBS: O PREFIXO E PEGO ATRAVES DAS CONFIGURAÇÕES EM client.settings.
   */
  if (message.content.indexOf(process.env.PREFIX) !== 0) return

  /** Então nós separamos o nome do comando de seus argumentos que são passados ao comando em si. */
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  /** Então se o comando existir ele irá ser executado.
   * Além disso o console também exibira o comando executado e quem o executou.
   */
  const cmd = client.commands.get(command)
  if (!cmd) return

  console.log('log', `${message.author.username} (${message.author.id}) executou o comando **${cmd.help.name}** no canal **${message.channel.name}**`)
  if (cmd.conf.onlyguilds && !message.guild) return // Guild check
  cmd.run(client, message, args)
}
