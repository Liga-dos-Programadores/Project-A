/**
 * O Comando Help envia uma mensagem de ajuda.
 * Cotendo comandos e outras informações.
 */

exports.run = (client, message, args) => {

  /** Objeto embed que irá ser enviado. */
  let embed = {
    color: 0xB1103C,
    title: 'Lista de Comandos Project: A',
    url: 'https://github.com/katho162/ProjectA',
    description: 'Todos os Comandos disponiveis',
    footer: {
      text: 'Não se esqueça de checar nosso codigo fonte ;) ® 2017, A Liga Dos Programadores.',
    },
    fields: []
  }

  /** Laço de repetição em todos os comandos
   * A cada comando é adicionado as informações em um object na array fields[]
   */
  client.commands.forEach(command => {
    embed.fields.push(
      {
        name: `**${message.settings.PREFIX}${command.help.name}**`,
        value: `**Descrição**: ${command.help.description}\n**Como Usar**: ${message.settings.PREFIX}${command.help.usage}`
      }
    );
  });

  /** Então envia a mensagem embed para o usuario. */
  message.author.send({embed: embed});

};

exports.conf = {

};

exports.help = {
  name:"help",
  category:"Help",
  description:"Mostra todos os comandos disponiveis do bot.",
  usage: "help"
}
