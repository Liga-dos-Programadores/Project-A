/**
 * O evento raw é emitido pelo discord.js para todo pacote recebido.
 * Neste caso, estamos utilizando ele para registrar reações em uma mensagem mesmo que ela não esteja armazenada no cache.
 */

module.exports = async (client, event) => {
  // Verificamos se o tipo do evento é de adicionar ou remover uma reação
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
    // Importamos o arquivo de configuração de "EmojiRole"
    const emojiToRole = require('../emojiRole.json')
    // Se o id da mensagem cadastrada na configuração não for o mesmo da mensagem que recebeu a reação, cancelamos a execução dessa função
    if (emojiToRole.id !== event.d.message_id) return
    // Se o emoji da reação não estiver registrado na lista, cancelamos também
    if (!emojiToRole.emojis[event.d.emoji.id]) return
    // Pegamos o canal onde a mensagem foi enviada para poder ter acesso ao objeto do membro
    const channel = client.channels.get(event.d.channel_id)
    // Pegamos o membro a partir da guild
    const member = channel.guild.members.get(event.d.user_id)
    // Pegamos a role a partir do id
    const role = channel.guild.roles.get(emojiToRole.emojis[event.d.emoji.id])
    // Para evitar um possivel erro, verificamos se as duas variaveis existem (caso a role tenha sido deletada ou o usuario tenha saido do servidor)
    if (!member || !role) return
    // Se a reação foi ADICIONADA, terminamos a execução adicionando o cargo para o membro
    if (event.t === 'MESSAGE_REACTION_ADD') return member.addRole(role)
    // Caso a função não deixe de ser executada (se o tipo do evento for de remoção de reaction), removemos o cargo
    member.removeRole(role)
  }
}
