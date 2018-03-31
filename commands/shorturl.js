const request = require('snekfetch');
const Discord = require("discord.js");

module.exports = {
    /** 
     * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
     * Que passará os argumentos atraves do middleware que programamos.
     */
    run: async (client, message, args) => {
        //Verificamos se o número de argumentos é válido. 
        if (args.length < 1) {
            return message.reply(`?? Talvez isso possa ajudá-lo: ${message.settings.PREFIX}shorturl <url>`);
        }

        //Pegando a URL que o usuário mandou
        let url = args.join(' ');

        //Chechado ser é uma URL valida
        const regx = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\\=]*)/;
        if (!url.match(regx)) {
            return message.reply("URL fornecido inválido, tente novamente.");
        }

        //Deletando message que o usuário mandou
        message.delete();

        //Fazendo conexão com a API do tinyurl
        let res = await request.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);

        //Criando embed que sera enviado para o usuário
        let embed = new Discord.RichEmbed()
            .setColor("#eb1818")
            .addField("URL Original", url)
            .addField("URL encurtada", res.body);

        //Aqui sera enviado o embed no canal que o usuário executo o comando
        message.channel.send(embed);
    },
    /** 
     * Aqui podemos colocar mais algumas configurações do comando. 
     */
    conf: {},

    /** 
     * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc... 
     */
    get help() {
        return {
            name: "shorturl",
            category: "Membros",
            description: "Encurta um URL.",
            usage: `shorturl <url>`
        }
    }
};