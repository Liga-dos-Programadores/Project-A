const Discord = require('discord.js');
const config = require('../config.json');

exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply('TALOCO???? VO BANI ESSE CARA N MÓ GENTE FINA');
    if (args.length === 0) return message.reply(`Utilize ${config.prefix}ban @membro [motivo]`);
    
    let banMember = message.mentions.users.first() || message.guild.members.get(args[0]);
        if (!banMember) return message.reply("Não foi possível encontrar esse membro!");
    
    let banReason = args.slice(1).join(" ");
        if (!banReason) return message.reply("O motivo do ban não foi informado!");

    try {
        message.guild.member(banMember).ban(banReason);
        message.channel.send(`${banMember} foi **banzido(a)** pelo **motivo**: ${banReason}`);
    } catch(error) {
        message.reply(`${error}`);
    }
}

exports.help = {
    name: "ban",
    description: `'${config.prefix}ban @membro [motivo]' bane um mebro por um motivo`
}