module.exports = {
  run: (client, message, args) => {
    if(message.member.permissions.missing(['MANAGE_MESSAGES'])) return message.channel.send('> Você não pode usar esse comando!');

    let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
      },

  conf: {},

  get help () {
    return {
      name: 'say',
      category: 'Moderação',
      description: 'Faz o bot enviar tal mensagem.',
      usage: 'say',
    }
  }

}
