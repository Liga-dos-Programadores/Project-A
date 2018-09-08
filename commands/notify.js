/**
 * O Comando "notify" adiciona o cargo de notificações aos membros
 */

module.exports = {

/** Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
 * Que passara os argumentos atraves do middleware que programamos.
 */
run: (client, message, args) => {

    /** Verificamos se o numero de argumentos é o correto. */
    if (!(args.length === 0)) return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${process.env.PREFIX}${this.help.usage}\`\`\``);

    /** Então verificamos os argumentos e instanciamos o cargo que queremos pelo nome. */
    let role = message.guild.roles.find("name", "Novidades");
    
    /** Logo então atribuimos o cargo ao membro e mandamos uma mensagem como resposta
     * Caso o membro ja possua o cargo então é enviada uma mensagem retornando.
     */
    if (!message.member.roles.exists("name", role.name))
    {
        message.member.addRole(role);
        return message.reply(`*Beep boop!@* Agora você sempre será notificado quando ouver noticias`);
    }
    else
    {
        return message.reply(`Você ja possui este cargo!`);
    }
},

/** Aqui podemos colocar mais algumas configurações do comando. */
conf: {
    onlyguilds: true
},

/** Aqui exportamos ajuda do comando como o seu nome categoria descrição etc... */
get help () {
    return {
        name: "notify",
        category: "Moderação",
        description: "Adiciona o cargo de notificações a si mesmo.",
        usage: "notify"
    }
}

};
    