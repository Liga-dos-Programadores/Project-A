/**
 * TODO: add documentation
 */

module.exports = async (client, event) => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
    const emojiToRole = require('../emojiRole.json')
    if (emojiToRole.id !== event.d.message_id) return
    if (!emojiToRole[event.d.emoji.id]) return
    const channel = client.channels.get(event.d.channel_id)
    const member = channel.guild.members.get(event.d.user_id)
    if (event.t === 'MESSAGE_REACTION_ADD') return member.addRole(channel.guild.roles.get(emojiToRole[event.d.emoji.id]))
    member.removeRole(channel.guild.roles.get(emojiToRole[event.d.emoji.id]))
  }
}
