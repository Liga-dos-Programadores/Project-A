// O Comando "addlang" adicionará os cargos aos membros,
// conforme a sua linguagem de programação à escolha

// Definir as classes "Command", "LanguageManager" e "languageManager"
const { Command } = require('../structures/');
const { LanguageManager } = require('../utils/')
const languageManager = new LanguageManager();

module.exports = class AddLang extends Command {
    constructor (client) {
        super(client);
        this.name = 'addlang';
        this.category = 'Moderação';
        this.description = 'Adiciona um cargo de alguma linguagem de programação a si próprio.';
        this.usage = `[${languageManager.getLanguages().join('|')}]`;
        this.onlyGuilds = true;
    }

    // A função "run (message, args)" será executada pelo nosso arquivo "MessageListener.js"
    // que passará os argumentos atraves do middleware que programamos.
    run (message, args) {
        // Verificamos se o número de argumentos é válido.
        if (!args) return message.reply(`Você precisa de me dar uma linguagem válida, usando \`${process.env.PREFIX}${this.name} ${this.usage}\``);

        // Verificamos os argumentos e pesquisamos o cargo que queremos pelo nome.
        const languages = languageManager.getLanguages();
        const languageName = languages.map(l => l.toLowerCase()).find(l => l === args.join(' ').toLowerCase());
        const role = languageName && message.guild.roles.find(r => r.name.toLowerCase() === languageName);

        if (!role) {
            message.react(message.guild.emojis.find('name', 'thonk') || '🤔');
            return message.reply(`Você precisa de me dar uma linguagem válida, usando \`${process.env.PREFIX}${this.name} ${this.usage}\``)
        }

        // E logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta.
        // Caso o membro já possua o cargo, é enviada uma mensagem avisando que o membro já tem esse cargo.
        if (!message.member.roles.has(role.id)) {
            message.member.addRole(role);
            return message.reply(`*Beep boop!@* Agora você possui o cargo **${role.name}**!`);
        } else {
            return message.reply(`Você já possui esse cargo!`);
        }
    }
}