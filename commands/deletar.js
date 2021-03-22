/**
 * O Comando "deletar" apagará determinada quantidade de mensagens.
 * Apenas quem tem permissão poderá usar esse comando.
*/

// module.exports = {
//   run: (client, message, args) => {
    // if(!message.member.hasPermission("MENAGE_MESSAGES")) return message.reply("> **Você não tem permissão para isso!**");

    // const deleteCount = parseInt(args[0], 10);

    // if(!deleteCount || deleteCount <1 || deleteCount > 100) return message.reply("> **Forneça um número de até 100 mensagens a serem excluídas.**");

    // const fetched = await message.channel.messages.fetch({ limit: deleteCount * 1 });
    // message.channel
    //   .bulkDelete(fetched)
    //   message.channel.send(`${args[0]} mensagens deletadas.`)
    //   .catch(error => console.log(`Não foi possível deletar mensagens devido a: ${error}`));
    
//     message.delete();
    
//     const amount = args.join(" ");

//     if(!amount) return message.reply('> **Por favor coloque determinada quantidade de mensagem para eu deletar.**')
//     if(amount > 100) return message.reply(`você não pode deletar menos de 100 mensagens!`)
//     if(amount < 1) return message.reply(`você precisa deletar pelo menos uma mensagem.`)

//     await message.channel.messages.fetch({limit: amount}).then(messages => {
//       message.channel.bulkDelete(messages
//     )});
//   },

//   conf: {
//     onlyguilds: true
//   },

//   get help () {
//     return {
//       name: 'deletar',
//       category: 'Moderação',
//       description: 'Apaga mensagens de um canal.',
//       usage: 'deletar [1 - 100]',
//       admin: true
//     }
//   }
// }
