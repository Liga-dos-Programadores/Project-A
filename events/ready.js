const Discord = require('discord.js');

module.exports = (client) => {
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuário(s) online em ${client.guilds.cache.size} servidor(es)!`)
}