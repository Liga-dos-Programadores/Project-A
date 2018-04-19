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
            return message.reply(`?? Talvez isso possa ajudá-lo: ${message.settings.PREFIX}crypto [BTC, LTC, BCH]`);
        }
        
        //Pegando a moeda que o usuário digitou
        let coin = args.join(' ');
        try {
            //Fazendo conexão com a API do mercadobitcoin
            const data = await request.get(`https://www.mercadobitcoin.net/api/${encodeURIComponent(coin)}/ticker/`).then(res => JSON.parse(res.text));
            //Deletando message que o usuário mandou
            message.delete();

            //Criando embed que sera enviado para o usuário
            let embed = new Discord.RichEmbed()
                .setDescription("Cotação do " + coin.toUpperCase())
                .setColor("#eb1818")
                .setThumbnail('https://cdn2.iconfinder.com/data/icons/bitcoin-and-mining/44/trade-128.png')
                .addField("Preço de compra", parseFloat(Math.round(data.ticker.buy * 100) / 100).toFixed(2))
                .addField("Preço de venda", parseFloat(Math.round(data.ticker.sell * 100) / 100).toFixed(2))
                .addField("Data", formatDate(data.ticker.date));

            //Aqui sera enviado o embed no canal que o usuário executo o comando
            message.channel.send(embed);
        } catch (err) {
            message.reply(`?? Talvez isso possa ajudá-lo: ${message.settings.PREFIX}crypto [BTC, LTC, BCH]`);
        }
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
            name: "crypto",
            category: "Membros",
            description: "Cotação de criptomoedas.",
            usage: `crypto [BTC, LTC, BCH]`
        }
    }
};

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {Date=} [date]
 * @return {string}
 */

function formatDate(unix) {
    var data = new Date(unix * 1000);
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var date = data.getDate();
    var hour = data.getHours();
    var min = data.getMinutes();
    var time = date + '/' + month + '/' + year + ' às ' + hour + ':' + min;
    return time;
}

