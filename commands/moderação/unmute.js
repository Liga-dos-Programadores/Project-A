/**
 * O Comando "unmute" desmutará determinado usuário.
 */

const Discord = require('discord.js');

module.exports = {
  run: function (client, message, args) {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) {
      return message.channel
        .send('> **Você não tem permissão para usar esse comando!**')
        .then((m) => m.delete({ timeout: 2000 }));
    }

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const mutedRole = message.guild.roles.cache.get(process.env.CARGO_MUTADO);

    if (!member) {
      return message.channel.send(
        `*${message.author}, o uso correto do comando é: \`\`!unmute @Usuário\`\`.*`
      );
    }

    if (member.roles.cache.has(process.env.CARGO_MUTADO)) {
      member.roles.remove(process.env.CARGO_MUTADO);
     return message.reply(
        `**${member.displayName}** foi desmutado(a)!`
      );
    } else {
      return message.channel.send(
        `${message.author}, **${member.displayName}** não está mutado(a). 🤔`
      );
    }
  },

  conf: {},

  get help() {
    return {
      name: 'unmute',
      description: 'O Comando "unmute" desmutará determinado usuário.',
      usage: 'unmute',
    };
  },
};