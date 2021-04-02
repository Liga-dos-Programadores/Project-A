/**
  * O Comando "duvida" vai enviar uma mensagem ao usuário mostrando como o mesmo deve realizar uma pergunta ao estar com duvida.
*/

const Discord = require('discord.js')

module.exports = {
  /**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

  run: function (client, message, args) {
  
    const embed = new Discord.MessageEmbed()
    .setColor(process.env.COLOR)
    .setAuthor("Como perguntar 📝")
    .setDescription('1. Descreva seu problema de forma simples e objetiva.\n2. Sempre que compartilhar algum código use as tags de [Markdown](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-) apropriadas.')

    // Aqui será enviado o embed no canal que o usuário executo o comando 
    message.channel.send({ embed })
  },
  /**
    * Aqui podemos colocar mais algumas configurações do comando.
    */
  conf: {},

  /**
    * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
    */
  get help () {
    return {
      name: 'pergunta',
      category: 'Ajuda',
      description: 'Template de como fazer uma pergunta.',
      usage: 'pergunta'
    }
  }
}
