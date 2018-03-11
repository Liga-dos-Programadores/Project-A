// Esse comando serve para usuarios que querem resetar sua apresentacao no chat #apresente-se para criar uma nova

exports.run = (client, message, args) => {
    if (message.member.roles.exists("name", "Apresentado"))
    {
        // Registra e checa se o canal Apresente-se existe
        var channel = message.guild.channels.find("id", client.settings.APRESENTACAO);
        if(channel)
        {
            // Faz um fetch de 100 mensagens no canal apresente-se
            channel.fetchMessages({limit: 100})
            .then(messages => {
                // Filtra as mensagens retornando apenas as enviadas pelo usuario
                var usrMessages = messages.filter((m) => {
                    return (m.author == message.author && m.deletable)
                });
                // Verifica se a variavel acima tem elementos
                if (usrMessages.array().length != 0)
                {
                    // se existirem mensagens do usuario...
                    usrMessages.deleteAll(); // remove todas as mensagens
                    message.member.removeRole(message.guild.roles.find("name", "Apresentado")); // remove o cargo/role
                    message.reply("Sua apresentação foi removida!"); // envia uma mensagem
                }
                else
                {
                    // se nao existirem mensagens do usuario...
                    message.member.removeRole(message.guild.roles.find("name", "Apresentado")); // remove o cargo/role
                    message.reply(`Não encontrei nenhuma mensagem sua no ${channel}, então apenas removi sua role.`); // envia uma mensagem
                }
            });
        }
        else
        {
            // Verifica se existe o emoji especial do servidor (:thinkdown:) e se nao existir substitui pelo :thinking:
            const specialemoji = message.guild.emojis.find("name", "thinkdown");
            message.reply(`Não consegui encontrar o canal de apresentacoes ${(specialemoji) ? specialemoji : "🤔"}`);
        }
    }
    else
    {
        // Verifica se existe o emoji especial do servidor (:thinkdown:) e se nao existir substitui pelo :thinking:
        const specialemoji = message.guild.emojis.find("name", "thinkdown");
        message.reply(`${(specialemoji) ? specialemoji : "🤔"} Voce ainda não se apresentou!`)
    }
}

exports.conf = {

}

exports.help = {
    name:"reset",
    category: "",
    description: "Reseta o status de apresentação do usuario",
    usage:"reset"
}