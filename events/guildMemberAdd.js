const moment = require('moment')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, member) => {
  // Verificações anti-selfbot de divulgação já que estamos tendo problemas com isso.
  const daysSinceCreation = moment().diff(moment(member.user.createdAt), 'days')
  const isDefaultAvatar = member.user.displayAvatarURL.startsWith('https://discordapp.com/')
  const domaincount = member.user.username.match(/\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/)
  if (domaincount > 0 && (isDefaultAvatar || daysSinceCreation < 3)) return (() => { member.send('Olá! você foi kickado automaticamente por suspeita de divulgação em nosso servidor. Contas com menos de 3 dias no discord não podem ter domínios (exemplo twitter.com)').catch(); member.kick('Autokick: Selfbots não são bem vindos').catch() })()

  // Mensagem automatica de "bem-vindo"
  const message = {
    content: '',
    embed: {
      color: 15407128,
      description: `Olá ${member}, seja bem vindo(a) a Liga dos Programadores!`,
      author: {
        name: `${member.user.username}#${member.user.discriminator}`,
        icon_url: member.user.displayAvatarURL
      }
    }
  }

  member.guild.channels.get(process.env.GREETCHANNEL).send(message).catch()
}
