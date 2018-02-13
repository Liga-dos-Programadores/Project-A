/**
 * O Evento message é emitido toda vez que o bot recebe uma mensagem.
 * Podemos usar este evento como uma espécie de middleware para impedir vulnarabilidades ou outras coisas.
 */
module.exports = (client, message) =>
{
  /** É uma boa pratica ignorar outros bots. isso faz o bot se auto-ignorar também.
   * E Também não entrara em um loop de spam...
   */
  if (message.author.bot) return;

  /** Chamamos as configurações para pegar algumas coisas */
  message.settings = client.settings;

  // Checamos se a mensagem é do canal #apresente-se
  if (message.channel.id === message.settings.APRESENTACAO) {
    // Checamos se o usuario tem a role "Apresentado"
    role = message.guild.roles.find("name", "Apresentado");
    if (!message.member.roles.exists("name", role.name)) {
      // Se nao tiver, adicionamos ela
      message.member.addRole(role).catch(console.error);
      message.react('👍');
    } else {
      // Se ja tiver, a mensagem e considerada como spam e é removida
      message.delete().catch(console.error);
    }
    // return;
  }

  /** Outra boa pratica é ignorar qualquer mensagem que não começe com o prefixo escolhido do bot.
   * OBS: O PREFIXO E PEGO ATRAVES DAS CONFIGURAÇÕES EM client.settings.
   */
  if(message.content.indexOf(message.settings.PREFIX) !== 0) return;

  /** Então nós separamos o nome do comando de seus argumentos que são passados ao comando em si. */
  const args = message.content.slice(message.settings.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  /** Então se o comando existir ele irá ser executado.
   * Além disso o console também exibira o comando executado e quem o executou.
   */
  const cmd = client.commands.get(command);
  if (!cmd) return;

  console.log("log", `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`);
  cmd.run(client, message, args);
}
