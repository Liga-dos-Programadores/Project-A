// Importar a classe "EventListener"
const { EventListener } = require('../structures/');

module.exports = class ReadyListener extends EventListener {
    constructor (client) {
        super(client);
        this.events = ['ready']; // Evento que é acionado ao bot ser carregado com sucesso
    }

    onReady () {
        this.log(`Bot iniciado com sucesso! Trabalhando com ${this.users.size} em ${this.guilds.size} servidores`, 'Discord'); // Enviamos para a consola que o bot foi iniciado com sucesso.
        this.user.setPresence({ status: 'online', game: { name: process.env.GAME || `${process.env.PREFIX}help` } }); // Definimos também a presença do bot, para aparecer "Jogando (...)", que poderá ser um jogo definido no .env ou o comando de ajuda do bot.
    }
}