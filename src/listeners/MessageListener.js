// Importar a classe de "EventListener" e de "Embed"
const { EventListener, Embed } = require('../structures/');

module.exports = class MessageListener extends EventListener {
    constructor (client) {
        super(client);
        this.events = ['message']; // Evento que é acionado a cada nova mensagem
    }

    async onMessage (message) {
        if (message.author.bot) return; // Se o membro for um bot, ignorar.

        // Se existir um canal de apresentações, e uma mensagem vier de lá...
        if (process.env.APRESENTACAO && message.channel.id === process.env.APRESENTACAO) {
            // Verificamos se o usuário tem a role "Apresentado"
            const role = message.guild.roles.find('name', 'Apresentado');
            if (!message.member.roles.exists('name', role.name)) {
                // Se não tiver, adicionamo-la.
                message.member.addRole(role)
                    .then(() => message.react('👍'));
            } else {
                // Se o membro já tiver o cargo, a mensagem é considerada como spam e é removida
                // Iremos agora definir o embed
                const embed = new Embed(message.author);

                // Adicionar os fields de título e descrição
                embed
                    .setTitle('Como resetar seu status de apresentação:')
                    .setDescription('Olá! Caso você tenha errado a digitação de algo em sua mensagem de apresentação, basta digitar o comando `p!reset` no chat de comandos do servidor para resetar a sua apresentação!');

                // Apagamos a mensagem enviada pelo autor...
                message.delete();
            
                // E enviamos para o autor da mensagem!
                message.author.send(embed)
                    .catch(() => message.reply('Desculpe, mas eu não tenho permissões para enviar mensagens por DM para você!')); // Essa mensagem irá ser enviada caso o bot não consiga enviar DM para o usuário
            }
            return;
        }
    
        // Se existir um canal de sugestões, e uma mensagem vier de lá...
        if (process.env.SUGESTOES && message.channel.id === process.env.SUGESTOES) {
            await message.react('⬆'); // Reagir com thumbs up
            await message.react('⬇'); // e com thumbs down, claro
            return;
        }

        const prefix = process.env.PREFIX;
        const prefixRegex = new RegExp(`^(<@[!]?${this.user.id}>[ ]?|${prefix}).+`); // Expressão geral para usar tanto um prefixo como a menção do bot
        const regexResult = prefixRegex.exec(message.content);
        if (regexResult) {
            const usedPrefix = regexResult[1];
            const fullCmd = message.content.split(' ').filter(a => a).map(s => s.trim());
            const args = fullCmd.slice(1); // Argumentos da mensagem
            const cmd = fullCmd[0].substring(usedPrefix.length).toLowerCase(); // Nome do comando
            const command = this.commands.find(c => c.name.toLowerCase() === cmd || c.aliases.includes(cmd))
            if (command && command.canRun(message, args)) { // Se o comando for um comando e puder ser executado...
                command._run(message, args); // Executa-o.
                this.log(`"${message.content}" (${command.constructor.name}) foi executado por "${message.author.tag}" (${message.author.id}) no servidor "${message.guild.name}" (${message.guild.id}) no canal "#${message.channel.name}" (${message.channel.id})`, 'Comandos');
            }
        }
    }
}