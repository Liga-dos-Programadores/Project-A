const Discord = require('discord.js');
require('dotenv').config();

module.exports = (client, message, args) => {
  const guild = client.guilds.cache.get(process.env.SERVIDOR);
  const channel = client.channels.cache.get(process.env.BOASVINDAS)
  const emoji = message.guild.emojis.cache.find(emoji => emoji.id === process.env.SERVER_EMOJI);

  if (guild != Discord.TeamMember.guild) {
    return console.log("Você não é do servidor!")
  } else {
    const embed = new Discord.MessageEmbed()
    .setColor(process.env.COLOR)
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTitle(`${emoji} Boas-vindas ${emoji}`)
    .setImage('https://i.imgur.com/W2L4r1L.png')
    .setDescription(`${member.user}, boas-vindas ao servidor! Atualmente estamos com ${member.guild.memberCount} membros!`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
    .setFooter('2021 © Liga dos Programadores.')
		.setTimestamp();

    message.channel.send(embed)
  }
};