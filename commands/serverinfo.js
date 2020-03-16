const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

exports.run = (bot, message, args) => {
// module.expots.run = (bot, message, args) => {} também funciona
    let gAvatar = message.guild.iconURL;
    const user = message.author;
    
    let membros = message.guild.memberCount;
    let bots = message.guild.members.filter(member => member.user.bot).size
    let total = membros - bots

    let embed = new Discord.RichEmbed()

    .setTimestamp()
    .setTitle(`${message.guild.name}`)
    .setColor("RANDOM")
    .setThumbnail(gAvatar)
    .setDescription('Informações sobre o servidor')
    .addField(`ID do servidor: `, message.guild.id)
    // .addField(`Fundador do servidor: `, message.guild.owner)
    .addField('Fundador do servidor:', 'José Samuel (Zeca)')
    .addField('Região do servidor:', message.guild.region)   
    .addField('Servidor criado em:', moment(message.guild.createdAt).format('DD/MM/YYYY'))
    .addField(`${user.username} entrou no servidor em:`, moment(message.member.joinedAt).format('DD/MM/YYYY'))
    .addField('Eu entrei aqui em:', moment(bot.user.joinedAt).format('DD/MM/YYYY'))
    .addField(`Total de canais:`, `${message.guild.channels.filter(channels => channels.type === 'voice').size} voz / ${message.guild.channels.filter(channels => channels.type === 'text').size} texto`)
    .addField(`Cargos [${message.guild.roles.size - 1}]:`, message.guild.roles.map(r => r).join(' ').replace('@everyone', ''))
    .addField('Humanos:', total, true)
    .addField('Bots:', bots, true)
    .addField('Total de membros:', membros, true)
    .addField('Online', `:green_circle: ${message.guild.members.filter(o => o.presence.status === 'online').size} Online`, true)
    .addField('Offline', `:red_circle: ${message.guild.members.filter(o => o.presence.status === 'offline').size} Offline`, true)
    .addField('Idle', `:orange_circle: ${message.guild.members.filter(o => o.presence.status === 'idle').size} Idle`, true)
    .addField('Do not Disturb', `:no_entry: ${message.guild.members.filter(o => o.presence.status === 'dnd').size} Do not Disturb`, true)
    // .addField('Membros banidos: ', message.guild.banlist)
    .setFooter('Serverinfo', bot.user.displayAvatarURL)

    message.channel.send(embed);
}

//module.exports.help = {name: 'sinfo'}
exports.help = {
    name: 'serverinfo',
    description: `Informações sobre o servidor`
}