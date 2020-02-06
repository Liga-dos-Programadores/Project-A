
module.exports = {
 run: function (client, message, args) {
  client.on("messageUpdate", async(oldMessage, newMessage) => {
   if (oldMessage.content === newMessage) {
    return;
   }

    let logEmbed = new Discord.RichEmbed()
    .setColor("RANDOW")
    .setThumbnail(member.user.displayAvatarURL)
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .setThumbnail(oldMessage.author.avatarURL)
    .setDescription("Uma mensagem foi editada")
    .addField("Mensagem antiga", oldMessage.content, true)
    .addField("Nova mensagem", newMessage.content, true)
    .setTimesTamp()
    .setFooter("Update message")

    let loggingChannel = newMessage.guild.channels.find(ch => ch.name === "log")
    if(!loggingChannel) return;
  });
 },

 conf: {},

 get help () {
  return {
    name: 'log',
    category: 'Moderação',
    description: 'Log de mensagens',
  }
}
}