/** O Comando "Help" envia uma mensagem no privado, contendo as informações dos comandos. */

const Discord = require('discord.js')
require('dotenv').config();
const fs = require('fs');

module.exports = {
  run: (client, message, args) => {
    
    if(!args[0]) {
      let categories = [];

      fs.readdirSync('./commands/').forEach((dir) => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if(!file.name) return "Não foi encontrado comandos!"

          let name = file.name.replace('.js', '');

          return `\`${name}\``;
        });

        let data = new Object();
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ?'Em progresso' : cmds.join(' '),
        };
        categories.push(data)
      });

      const helpembed = new Discord.MessageEmbed()
      .setTitle('Lista de comandos 📃')
      .addFields(categories)
      .setDescription(`Use ${process.env.PREFIX}help + *nome do comando* para ver mais informações.`)
      .setColor(process.env.COLOR)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()

      return message.channel.send(helpembed)
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()))
    
      if(!command) {
        const nocommandembed = new Discord.MessageEmbed()
        .setTitle('Comando não encontrado!')
        .setDescription(`Use \`${process.env.PREFIX}help\` para listar todos os comandos.`)
        .setColor(process.env.COLOR)
        .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
			  .setTimestamp()

        return message.channel.send(nocommandembed)
      }

      const helpcommandembed = new Discord.MessageEmbed()
      .setTitle('Informações do comando 📄')
      .addField('Nome', command.help.name ? `\`${command.help.name}\`` : 'Sem nome')
      .addField(`Como usar:`, `\`${command.help.usage}\``)
      .addField('Descrição', command.help.description)
      .addField('Categoria', command.help.category)
      .setColor(process.env.COLOR)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
      .setTimestamp()

      return message.channel.send(helpcommandembed)
    }
  },

  conf: {},

	help: {
		name: 'help',
		category: 'Ajuda',
		description: 'Mostra todos os comandos disponíveis do bot.',
		usage: '!help',
	},
}