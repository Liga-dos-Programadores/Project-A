/**
 * O evento guildMemberAdd é emitido após um membro entrar no servidor.
 */

module.exports = async (_client, member) => {
  const message = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor("RANDOM")
    .setAuthor("👤 Um membro saiu do servidor!")
    .setDescription(`${member} acabou de sair.`)
    .setFooter("2020 ©Liga dos Programadores")
    .setTimestamp();

  // TODO: Handle error correctly //
  member.guild.channels.get(process.env.LEAVECHANNEL).send(message).catch();
};
