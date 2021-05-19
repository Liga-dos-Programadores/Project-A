/** O Comando "Help" envia uma mensagem no privado, contendo as informações dos comandos. */

const Discord = require('discord.js')
require('dotenv').config();
const fs = require('fs');

module.exports = {
  run: (client, message, args) => {
    if(!args[0]) {
      let categories = [];

      fs.readdirSync('../../commands').forEach((dir) => {
        const commands = fs.readdirSync(`../../commands/${dir}`).filter((file) => file.endsWith('.js'));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if(!file.name) return "Não foi encontrado comandos!"

          let name = file.name.replace('.js', '');

          return `\`${name}\``;
        });

        let data = new Object();
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ?'In progress' : cmds.join(' '),
        };
        categories.push(data)
      });

      const helpembed = new Discord.MessageEmbed()
      .setTitle('Lista de comandos')
      .addField(categories)
      .setDescription(`Use ${process.env.PREFIX}ajuda mais o comando para ver mais informações`)
      .setColor(process.env.COLOR)
      .setTimestamp()

      return message.channel.send(helpembed)
    } else {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()))
    
      if(!command) {
        const nocommandembed = new Discord.MessageEmbed()
        .setTitle(`Nenhum comando foi encontrado! Use \`${process.env.PREFIX}ajuda\` para listar todos os comandos.`)
        .setColor(process.env.COLOR)
        .setTimestamp();

        return message.channel.send(nocommandembed)
      }

      const helpmenuembed = new Discord.MessageEmbed()
      .setTitle('Comando info')
      .addField(`Prefix`, `\`${process.env.PREFIX}\``)
      .addField('Comando', command.name ? `\`${command.name}\`` : 'Sem nome')
      .addField('Aliases', command.aliases ? `\`${command.aliases.join('` `')}\`` : 'Sem aliases')
      .addField('Usage', command.usage)
      .addField('Descrição', command.description)
      setTimestamp()
      .setColor(process.env.COLOR)

      return message.channel.send(helpmenuembed)
    }
  },

  conf: {},

	help: {
		name: 'help',
		category: 'Ajuda',
		description: 'Mostra todos os comandos disponíveis do bot.',
		usage: 'help',
	},
}


