const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('VO DESBANI N FALOU, VACILÃO MORRE CEDO');
    if (args.length === 0) return message.reply(`Utilize ${bot.config.prefix}unban [id do usuário] [motivo]`);
    
    let unbanMember = await bot.users.get(args[0]) || await bot.fetchUser(args[0])
        if (!unbanMember) return message.reply("Não foi possível encontrar esse id de usuário!");
    
    let unbanReason = args.slice(1).join(' ');
        if (!unbanReason) {
            unbanReason === "O motivo não foi adicionado";
        }
    
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Eu não tenho permissão para banir!");

    
    message.guild.unban(unbanMember, {unbanReason: unbanReason})
        .then(message.channel.send(`${unbanMember.tag} foi **desbanzido(a)** pelo **motivo**: ${unbanReason}`))
        .catch(error => message.reply(`Este usuário não está na lista de banzidos(as) [${error}]`));
};

module.exports.help = {
    name: "unban",
    description: `'${config.prefix}unban @membro [motivo]' desbane um membro e explicita o motivo`
}