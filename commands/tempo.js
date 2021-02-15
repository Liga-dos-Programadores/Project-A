/**
  * O Comando "snippet" vai enviar uma mensagem ao usuário mostrando como deve ser enviado exemplo de linhas de código.
*/

const Discord = require('discord.js');
require('dotenv').config();

module.exports = {

    /**
    * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
    * Que passará os argumentos atraves do middleware que programamos.
  */

    run: function (client, message) {
        message.reply("Ainda não implementado")
    },

    /**
    * Aqui podemos colocar mais algumas configurações do comando.
  */
    conf: {},

    /**
    * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
  */
    get help() {
        return {
            name: 'tempo',
            category: 'Ajuda',
            description: '',
            usage: '',
        };
    },
};