module.exports = {
  run: (client, message, args) => {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    message.channel.send(sayMessage);
  },

  conf: {},

  get help () {
    return {
      name: 'falar',
      category: 'Moderação',
      description: 'Faz o bot reenviar uma mensagem.',
      usage: 'falar',
    }
  }
}