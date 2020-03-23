module.exports = async (client) => {
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.size} usuario(s) em ${client.guilds.size} servidor(es)!`)

  client.user.setPresence({
    status: 'online',
    game: {
      name: process.env.WATCHING }
  })
}
