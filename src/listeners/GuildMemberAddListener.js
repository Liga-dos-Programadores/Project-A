// Importar a classe de "EventListener" e de "Embed"
const { EventListener, Embed } = require('../structures/');

module.exports = class GuildMemberAddListener extends EventListener {
    constructor (client) {
        super(client);
        this.events = ['guildMemberAdd']; // Evento que é acionado a um membro ter entrado num servidor
    }

    onGuildMemberAdd (member) {
        // Verificações anti-selfbot de divulgação, já que estamos tendo problemas com isso.
        const daysSinceCreation = moment().diff(moment(member.user.createdAt), 'days');
        const isDefaultAvatar = !member.user.avatarURL;
        const domaincount = member.user.username.match(/\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/);
        if (domaincount > 0 && (isDefaultAvatar || daysSinceCreation < 3)) {
            member.send('Olá! Você foi expulso automaticamente por suspeita de divulgação em nosso servidor. Contas com menos de 3 dias no Discord não podem ter domínios (como por exemplo, `twitter.com`)');
            member.kick('Autokick: Selfbots não são bem vindos');
            return;
        }

        // Se houver um canal de boas vindas...
        if (process.env.GREETCHANNEL) {
            // ... iremos enviar as boas vindas para o membro!

            // Definir o embed,
            const embed = new Embed();

            // adicionar uma cor para o embed, uma descrição e definir o autor no embed,
            embed
                .setColor('#EB1818')
                .setDescription(`Olá ${member}, seja bem vindo(a) a Liga dos Programadores!`)
                .setAuthor(member.user.tag, member.user.avatarURL);

            // e enviar!
            member.guild.channels.get(process.env.GREETCHANNEL).send(embed);
        }
    }
}