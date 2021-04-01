/**
 * O evento "apresentar" é emitido toda vez que o usuário enviar uma mensagem no canal de "Apresentação".
 */

module.exports = async (client, message) => {
  const presentedRole = process.env.ID_ROLE_APRESENTACAO;
  const presentationChannel = message.guild.channels.cache.get(
    process.env.APRESENTACAO
  );

  if (presentationChannel && !message.member.roles.cache.has(presentedRole)) {
    message.member.roles.add(presentedRole).catch(console.error);

    const emoji = message.guild.emojis.cache.get(
      process.env.APRESENTACAO_EMOJI_ID
    );
    emoji && message.react(emoji);
    console.log(message.member)
    message.member.roles.add(presentedRole).catch(console.error)
  } else {
    const embed = {
      color: 16739451,
      title: 'Como resetar seu status de apresentação:',
      description:
        '**Hey**, caso você tenha errado a digitação de algo em sua mensagem de apresentação, basta digitar o comando `p!reset` no *chat de comandos do servidor* para resetar a sua apresentação!',
    };
    message.author
      .send({ embed: embed })
      // TODO: Handle properly //
      .catch(() =>
        message.reply(
          'Me desculpe, mas eu não tenho permissões para enviar DM para você!'
        )
      );

    // TODO: Check if the bot has permission before trying to delete //
    message.delete().catch(console.error);
  }
};
