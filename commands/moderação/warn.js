/**
 * O Comando "warn" desmutará determinado usuário.
*/

const Discord = require('discord.js');
const fs = require("fs");
// const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })); }
    
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const reason = args.slice(1).join(' ');

  	if (!member) {
			return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`*O uso correto do comando é: \`\`!warn @usuario [motivo]\`\`.*`));
		}

    if (!reason) {
			return message.channel.send(new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setDescription(`*Coloque o motivo. 📃*`));
		}	

    if (member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(`Você não tem poder contra esse usuário!`)
    }

    if (!warns[member.id]) warns[member.id] = {
      warns: 0
    }

    warns[member.id].warns++;

    fs.writeFileSync("./warnings.json", JSON.stringify(warns), (err) => {
      if(err) console.log(err);
    });

    const embed = new Discord.MessageEmbed()
			.setColor(process.env.COLOR)
			.setAuthor('Warn!')
      .setThumbnail(`${member.user.avatarURL({ dynamic: true })}?size=1024`)
			.setDescription(`Membro: ${member}(${member.id})\nWarn por ${message.auhor}\nMotivo: ${reason}`)
      .addField("Warns", warns[member.id].warns)
      .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
			.setTimestamp();

      message.channel.send(embed)
  },
  conf: {},

  get help() {
    return {
      name: 'warn',
			category: 'Moderação',
      description: 'Mutará determinado usuário.',
			usage: '!warn @usuário motivo',
      admin: true
    }
  }
}