/**
 * O Comando "userinfo" mostrará informações do membro
*/

const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = {
  run: function (client, message, args) {
    const inline = true

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const roles = member.roles.cache
      .sort((a,b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, -1);
    const target = message.mentions.users.first() || message.author
    const bot = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'
    const activity = member.user.presence.activities.find(activity => activity.type === 'PLAYING') || null

    const embed = new Discord.MessageEmbed()
      .setThumbnail(target.displayAvatarURL)
      .setThumbnail(`${member.user.avatarURL({ dynamic: true })}?size=1024`)
      .setColor(process.env.COLOR)
      .setAuthor('🔍 Informações do usuário/bot')
      .addField('**Tag**', `${member.user.tag}`, inline)
      .addField('**ID**', member.user.id, inline)
      .addField("**Apelido**", `${member.nickname || "Nenhum"}`)
      .addField('**Bot**', `${bot}`, inline, true)
      .addField('**Jogando**', `${activity !== null ? activity : ' Nada'}`, inline, true)
      .addField('**Cargo(s)**', `${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Nenhum'}`)
      .addField('**Entrou no Discord em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt), true)
      .addField('**Entrou no servidor em**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt), true)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()
      
    message.channel.send(embed)
  },
  /**
     * Aqui podemos colocar mais algumas configurações do comando.
     */
  conf: {},

  /**
     * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
     */
  get help () {
    return {
      name: 'userinfo',
      category: 'Informação',
      description: 'Mostra informações sobre o usuário.',
      usage: '!userinfo'
    }
  }
}

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
