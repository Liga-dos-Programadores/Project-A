module.exports = class Command {
    constructor (client, parentCommand) {
        this.client = client;    // Definir o cliente, claro
  
        this.name = 'command';   // Definir o nome do comando,
        this.category = '';      // a sua categoria,
        this.description = '';   // a sua descrição,
        this.usage = '';         // e como é para ser usado!
      
        this.aliases = [];       // Definir "aliases", ou seja, outras palavras-chave alternativas para executar tal comando
  
        this.hidden = false;     // Definir "this.hidden". Se isto for "true", não irá aparecer na lista de comandos.
        this.onlyGuilds = false; // Definir "this.onlyGuild". Se isto for "true", apenas poderá ser usado em servidores.
  
        this.subcommands = [];   // Definir subcomandos, porque não? ¯\_(ツ)_/¯
  
        this.parentCommand = parentCommand;
    }
  
    canRun () {
        return true // Isto poderá ser usado se o comando pode ser executado, através de uma função no ficheiro
    }
  
    canLoad () {
        return true // Isto poderá ser usado se o comando pode ser iniciado, através de uma função no ficheiro
    }
  
    _run (msg, args) {
        if (this.onlyGuilds && !msg.guild) return msg.reply('Este comando só pode ser executado num servidor!');
        if (args.length > 0) {
            let subcommand = this.subcommands.find(c => c.name.toLowerCase() === args[0] || c.aliases.includes(args[0]));
            if (subcommand && subcommand.canRun(msg, args.slice(1))) {
                return subcommand.run(msg, args.slice(1)); // Executar como subcomando (se logicamente, for um subcomando)
            }
        }
        return this.run(msg, args); // Executar como comando (se logicamente, for um comando)
    }
  
    run () {}
}