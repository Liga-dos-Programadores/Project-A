const { RichEmbed } = require('discord.js');

/**
* O Comando "movemessage" vai mover uma mensagem do usuário de uma sala até outra, e em seguida apagar. Para sempre manter as conversas organizadas em suas salas
*/

module.exports = {
    /**
      * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
      * Que passará os argumentos atraves do middleware que programamos.
      */
    run: function (client, message, args) {

      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('você não tem permissão para usar esse comando!');

      // Criando embed que será enviado para o usuário
      let embed = new RichEmbed()

      message.channel.fetchMessage(args[0]) //buscando a mensagem que o bot vai mover
        .then( msg => {
          
          //atribuindo a mensagem ao embed
          embed.setAuthor( msg.author.username, msg.author.avatarURL, 'https://discord.js.org')
	             .setDescription(msg.content)
	             .setTimestamp()
	             .setFooter('moveu esta mensagem', message.author.avatarURL);

          //buscando o canal onde vai ser reposto
          client.channels.find('id', args[1])
            .send(`${msg.author} sua mensagem foi movida para esta sala`, embed)//enviando para o canal destino

          msg.delete() //deletando a mensagem no canal antigo
            .then(msg => console.log(`Mensagem de ${msg.author.username} movida`))
            .catch(err => console.warn(err));
        })
        .catch(err => {
          message.channel.send('ops, foi digitado algo errado! tente novamente...'); //caso o bot encontre algum problema
          console.warn(err);
        });

    },
    /**
      * Aqui podemos colocar mais algumas configurações do comando.
      */
    conf: {},
  
    /**
      * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
      */
    get help () {
      return {
        name: 'movemessage',
        category: 'Moderação',
        description: 'Acão de movimento de mensagem para organização.',
        usage: 'movemessage'
      }
    }
  }
  