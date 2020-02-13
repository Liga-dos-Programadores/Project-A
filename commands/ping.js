module.exports = {
  run: async (client, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging....`);

    msg.edit(`🏓 Pong!
        A latência da API é: ${Math.round(client.ping)}ms`);
  },

  conf: {},

  get help () {
    return {
      name: "ping",
      category: "fun",
      description: "PONG! Mostra a api e a latência do bot",
      usage: "!ping",
      acessablebly: "Members",
    }
  }
};