/**
 * O Comando "addlang" adicionará os cargos aos membros.
 */

const languagemanager = require("../utils/languagemanager");
const langmgr = new languagemanager();

/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
 * Que passara os argumentos atraves do middleware que programamos.
 */
exports.run = (client, message, args) => {

    /** Verificamos se o numero de argumentos é o correto. */
    if (!(args.length === 1)) return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${message.settings.PREFIX}${this.help.usage}\`\`\``);

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    let role;

    let langs = langmgr.getLanguages();
    let idx = langs.map(x => x.toLowerCase()).indexOf(args[0].toLowerCase());

    if (idx != -1) {
        role = message.guild.roles.find("name", langs[idx]);
    }
    else
    {
        const emoji = message.guild.emojis.find("name", "thinkkk");
        message.react((emoji) ? emoji : "🤔");
        return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${message.settings.PREFIX}addlang [${langs.join("|")}]\`\`\``);
    }

    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro ja possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.exists("name", role.name))
    {
        message.member.addRole(role);
        return message.reply(`*Beep boop!@* Agora você possui o cargo **${role.name}**`);
    }
    else
    {
        return message.reply(`Você ja possui este cargo!`);
    }
};

/** Aqui podemos colocar mais algumas configurações do comando. */
exports.conf = {

};

/** Aqui exportamos ajuda do comando como o seu nome categoria descrição etc... */
exports.help = {
    name: "addlang",
    category: "Moderação",
    description: "Adiciona um cargo de alguma linguagem de programação a si proprio.",
    usage: "addlang [java|c|c++|c#|python|kotlin|scala|go|javascript|php|swift|ruby|elixir|rust|assembly]"
}
