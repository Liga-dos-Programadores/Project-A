/**
   * Evento ready é disparado assim que o bot é conectado ao Discord
   */

module.exports = async (client) => {
<<<<<<< HEAD
  
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuário(s) online em ${client.guilds.cache.size} servidor(es)!`)

  let activities = [
    `${process.env.PREFIX}ajuda`,
    `${client.users.cache.size} usuários onlines!`,
  ],

  i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "WATCHING"
  }), 3000);
}
=======
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuario(s) em ${client.guilds.cache.size} servidor(es)!`)

  client.user.setPresence({
    status: 'online',
    activity: {
      name: process.env.GAME
    }
  })
}
>>>>>>> 833ad58dfa8ccf3972d0b3e9d62cf44b243fad5c
