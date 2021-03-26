/**
 * O Comando "serverinfo" mostrará informações do servidor
*/

const Discord = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {

    const roles = message.guild.roles.cache.sort((a,b) => b.position - a.position).map(role => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const date = message.guild.createdAt
    const joined = message.member.joinedAt
    const region = {
      brazil: ':flag_br: Brasil'
    }

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setAuthor('🔍 Informações do servidor')
      .setThumbnail(`${message.guild.iconURL({ dynamic: true })}?size=1024`)
      .addField('**Nome**', message.guild.name, true)
      .addField('**ID**', message.guild.id, true)
      .addField('**Dono(a)**', `${message.guild.owner.user.username}`, true)
      .addField('**Região**', region[message.guild.region], true)
      .addField('**Membro(s)**', message.guild.memberCount, true)
      .addField('**Bot(s)**', `${members.filter(member => member.user.bot).size}`, true)
      .addField('**Boost**', `${message.guild.premiumSubscriptionCount || '0'}`, true)
      .addField('**Canais de texto**', `${channels.filter(channel => channel.type === 'text').size}`, true)
      .addField('**Canais de voz**', channels.filter(channel => channel.type === 'voice').size, true)
      .addField('**Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date), true)
      .addField('**Você entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined), true)
      .addField('**Cargos**', `[${roles.lenght -1}]`, roles.lenght <10 ? roles.join(`, `) : roles.lenght >10 ? this.client.utils.trimArray(roles) : 'Nenhum cargo')
      .setFooter('2021 © Liga dos Programadores.')
      .setTimestamp()

    // Aqui sera enviado o embed no canal que o usuário executo o comando
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
      name: 'serverinfo',
      category: 'Info',
      description: 'Informação sobre o servidor',
      usage: 'serverinfo'
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
