/**
 * O Comando "avatar" mostrará a imagem de perfil do usuário ou do bot
*/

const Discord = require("discord.js");

module.exports = {

/** Primeiro o metodo run(client, message, args) será executado pelo arquivo message.js
   * Que passará os argumentos atraves do middleware.
*/

  run: function (client, message, args) {
   let member = message.mentions.users.first() || message.author

    const embed = new Discord.MessageEmbed()
    .setTitle(`Avatar de ${member.username}`)
    .setImage(member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor("#29C9FC")
    .setFooter('2021 © Liga dos Programadores.')
    .setTimestamp()

    message.channel.send(embed);
  },

  conf: {},

  /**
   * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
  */

  get help() {
    return {
      name: "avatar",
      category: "Info",
      description: "Mostra o avatar do usuário ou de um bot.",
      usage: "avatar",
    };
  },
};