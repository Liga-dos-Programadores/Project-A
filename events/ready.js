/**
   * Evento ready é disparado assim que o bot é conectado ao Discord
   */

module.exports = async (client) => {
  
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