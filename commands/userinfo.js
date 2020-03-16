const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents } = require('common-tags');
const { getMember, formatDate } = require('../functions.js');

exports.run = (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;
    const member = getMember(message, args.join(' '));
    const joined = moment(member.joinedAt).format('DD/MM/YYYY');
    const created = moment(member.user.createdAt).format('DD/MM/YYYY');
    const roles = member.roles
        .filter(r => r.id !== message.guild.id)
        .map(r => r).join(', ') || 'nenhum';

    let userinfo = {};
    userinfo.avatar = user.displayAvatarURL;
    userinfo.name = user.username;
    userinfo.discrim = user.discriminator;
    userinfo.id = user.id;
    userinfo.status = user.presence.status;
    userinfo.registred = created
    userinfo.joined = joined
    userinfo.roles = roles

    const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(user.tag, userinfo.avatar)
    .setThumbnail(userinfo.avatar)
    .setColor("RANDOM")
    .addField('Nome:', userinfo.name, true)
    .addField('Números do lado do nome:', userinfo.discrim, true)
    .addField('ID:', userinfo.id, true)
    .addField('Status:', userinfo.status, true)
    .addField('Registrou-se no discord em:', created, true)
    .addField('Entrou no server em:', joined, true)
    .addField('Cargos:', roles, true)
    .setFooter(`Userinfo @membro`, bot.user.displayAvatarURL) 

    
    if (member.user.presence.game) {
        embed.addField(`Jogando agora:`, member.user.presence.game.name)
    };

    message.channel.send(embed);
}

exports.help = {
    name: 'userinfo',
    description: `'${config.prefix}userinfo' mostra informações do próprio usuário e '${config.prefix}userinfo @membro' mostra informações sobre um membro do servidor`
}