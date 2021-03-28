/**
 * O evento "apresentar" é emitido toda vez que o usuário enviar uma mensagem no canal de "Apresentação".
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = async (client, message) => {
  if (message.author.bot) return

  const apresentedRole = process.env.APRESENTOU
	const apresentChannel = message.guild.channels.cache.get(process.env.APRESENTACAO);

  if (apresentChannel) {
    if (!message.member.roles.cache.has(apresentedRole)) {
      message.member.roles.add(apresentedRole).catch(console.error)
      const emoji = message.guild.emojis.cache.get(emoji => emoji.name === 'liga')
      message.react(emoji)
    } else {
      const embed = {
        color: 16739451,
        title: 'Como resetar seu status de apresentação:',
        description: '**Hey**, caso você tenha errado a digitação de algo em sua mensagem de apresentação, basta digitar o comando `p!reset` no *chat de comandos do servidor* para resetar a sua apresentação!'
      }
      message.author.send({
        embed: embed
      })
        .catch(() => message.reply('me desculpe, mas eu não tenho permissões para enviar DM para você!'))
      message.delete().catch(console.error)
    }
    return;
  }
}