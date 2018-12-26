// Definir o cliente do discord.js
const { Client } = require('discord.js');

// Definir o FileUtils, um módulo que nos vai
// ajudar a ler diretórios e os seus ficheiros
const { FileUtils } = require('./utils/');

// Definir as classes Command e EventListener
const { Command, EventListener } = require('./structures');

module.exports = class ProjectA extends Client {
    constructor (options = {}) {
        super(options);

        // Comandos
        this.commands = [];
        // Eventos
        this.listeners = [];

        // Iniciar EventListeners
        this.startListeners('src/listeners');
        // Iniciar Comandos
        this.startCommands('src/commands');
    }

    login (token) {
        token = token || process.env.AUTH_TOKEN;
        return super.login(token);
    }

    // Iremos usar a função "this.client.log()" para registrar
    // o que possa vir a acontecer, em vez do belo "console.log()"
    log (...args) {
        const message = args[0];
        const tags = args.slice(1).map(t => `[${t}]`);
        console.log(...tags, message);
    }

    // E mesmo se houver um erro, iremos usar a função
    // "this.client.logError()", porque né, fica bonito
    logError (...args) {
        const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : [];
        console.error('Error]', ...tags, args[args.length - 1]);
    }

    // Comandos

    addCommand (command) {
        if (command instanceof Command && command.canLoad()) { // Se o comando é realmente um comando e puder ser iniciado...
            this.commands.push(command);                       // Adiciona-o como comando.
        }
    }
    
    startCommands (dirPath) {
        return FileUtils.requireDirectory(dirPath, (NewCommand) => {
            if (Object.getPrototypeOf(NewCommand) !== Command || NewCommand.ignore) return; // Se o comando não for um comando ou se for definido para ignorar, não adicionar como comando.
            this.addCommand(new NewCommand(this));
            this.log(`${NewCommand.name} ligado.`, 'Comandos');
        }, (err) => this.logError(`${NewCommand.name} falhou a carregar: ${err}`, 'Comandos'));
    }
    
    // Listeners
    
    addListener (listener) {
        if (listener instanceof EventListener) { // Se o listener é realmente um listener ...
            const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
            listener.events.forEach(event => {
              this.on(event, listener['on' + capitalize(event)]);
            });
    
            this.listeners.push(listener);       // Adiciona-o.
        }
    }
    
    startListeners (dirPath) {
        return FileUtils.requireDirectory(dirPath, (NewListener) => {
            if (Object.getPrototypeOf(NewListener) !== EventListener) return; // Se o listener não for um listener, não adicionar como listener.
            this.addListener(new NewListener(this));
            this.log(`${NewListener.name} ligado.`, 'Listeners');
        }, (err) => this.logError(`${NewListener.name} falhou a carregar: ${err}`, 'Listeners'));
    }

}
