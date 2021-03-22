/**
 * O Comando "tempo" mostrará a temperatura de determinada região
*/

const Discord = require("discord.js");
const weather = require('weather-js');

module.exports = {

/** Primeiro o metodo run(client, message, args) será executado pelo arquivo message.js
  * Que passará os argumentos atraves do middleware.
*/

  run: function (client, message, args) {
    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result) {

      errorMessage = "> **Ocorreu um erro!**"
      localMessage = "> **Especifique uma localidade.**"
      invalidLocal = "> **Localização inválida!**"

      if(error) return message.channel.send(localMessage);
      if(!args[0]) return message.channel.send(localMessage);
      if(result === undefined || result.length === 0) return message.channel.send(invalidLocal);

      var current = result[0].current;
      var location = result[0].location;

      const tempoinfo = new Discord.MessageEmbed()
      .setAuthor(`☁️ Previsão do tempo para ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .addField('Fuso horário', `UTC${location.timezone}`, true)
      .addField('Tipo de grau', 'Celsius', true)
      .addField('Temperatura', `${current.temperature}°`, true)
      .addField('Vento', current.winddisplay, true)
      .addField('Sensação', `${current.feelslike}°`, true)
      .addField('Humidade', `${current.humidity}%`, true)
      .setColor("#29C9FC")
      .setFooter('2021 © Liga dos Programadores.')
      .setTimestamp()
      message.channel.send(tempoinfo)
    })
  },

  conf: {},

  /**
   * Aqui exportamos informações do comando: nome, categoria, descrição e como utiizá-lo.
  */

  get help() {
    return {
      name: "tempo",
      category: "Info",
      description: "Mostra a temperatura de determinada região.",
      usage: "tempo",
    };
  },
};