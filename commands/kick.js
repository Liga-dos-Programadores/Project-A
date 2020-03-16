const Discord = require('discord.js');
const config = require('../config.json');

exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply('TALOCO???? VO KICKA ESSE CARA N MÓ GENTE FINA');
    if (args.length === 0) return message.reply(`Utilize ${bot.config.prefix}kick @membro [motivo]`);
    
    let kickMember = message.mentions.users.first() || message.guild.members.get(args[0]);
        if (!kickMember) return message.reply("Não foi possível encontrar esse membro!");
    
    let kickReason = args.slice(1).join(" ");
        if (!kickReason) return message.reply("O motivo do kick não foi informado!");

    try {
        message.guild.member(kickMember).kick(kickReason);
        message.channel.send(`${kickMember} foi **kickado(a)** pelo **motivo**: ${kickReason}`);
    } catch(error) {
        message.reply(`${error}`);
    }
}

exports.help = {
    name: "kick",
    description: `'${config.prefix}kick @membro [motivo]' expulsa um membro por um motivo`
}