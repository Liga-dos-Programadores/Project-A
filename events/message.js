/**
 * O Evento message é emitido toda vez que o bot recebe uma mensagem.
 * Podemos usar este evento como uma espécie de middleware para impedir vulnarabilidades ou outras coisas.
 */
module.exports = async(client, message) => {
    /** É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
     * E Também não entrara em um loop de spam...
     */
    if (message.author.bot) return

    // Checamos se a mensagem é do canal #apresente-se
    if (message.channel.id === process.env.APRESENTACAO) {
        // Checamos se o usuario tem a role "Apresentado"
        let role = message.guild.roles.find('name', 'Apresentado')
        if (!message.member.roles.exists('name', role.name)) {
            // Se nao tiver, adicionamos ela
            message.member.addRole(role).catch(console.error)
            message.react('👍')
        } else {
            // Se ja tiver, a mensagem e considerada como spam e é removida
            // Define um objeto especificando o embed
            let embed = {
                color: 0xB1103C,
                title: 'Como resetar seu status de apresentação:',
                description: 'Olá! Caso você tenha errado a digitação de algo em sua mensagem de apresentação, basta digitar o comando `p!reset` no chat de comandos do servidor para resetar a sua apresentação!'
            }
            message.author.send({ embed: embed })
                .catch(() => message.reply('Desculpe, mas eu não tenho permissões para enviar mensagens por DM para você!'))
            message.delete().catch(console.error)
        }
        return
    }

    if (message.channel.id === process.env.SUGESTOES || message.channel.id === process.env.PROJETOS) {
        if (message.content.startsWith('^')) return
        await message.react('⬆')
        await message.react('⬇')
        return
    }

    if (message.channel.id === process.env.DESAFIOS) {
        await message.react('✅')
        return
    }

    /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
     * OBS: O PREFIXO E PEGO ATRAVES DAS CONFIGURAÇÕES EM client.settings.
     */
    if (message.content.indexOf(process.env.PREFIX) !== 0) return

    /** Então nós separamos o nome do comando de seus argumentos que são passados ao comando em si. */
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    /** Então se o comando existir ele irá ser executado.
     * Além disso o console também exibira o comando executado e quem o executou.
     */
    const cmd = client.commands.get(command)
    if (!cmd) return

    console.log('log', `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`)
    if (cmd.conf.onlyguilds && !message.guild) return // Guild check
    cmd.run(client, message, args)
}