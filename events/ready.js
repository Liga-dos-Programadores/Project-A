const Discord = require('discord.js');
require('dotenv').config();

module.exports = (client) => {
  let activities = [
    `${process.env.PREFIX}help para obter ajuda.`,
    `${client.users.cache.size} usuários`
  ]
  i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
    type: "WATCHING"
  }), 5000);
  client.user
    .setStatus("online")
    .catch(console.log)
  console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuário(s) online no servidor!`)
}