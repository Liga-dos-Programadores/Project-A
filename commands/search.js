/**
 * O Comando "search" vai retornar ao usuário um pesquisa feita no duckduckgo.
 */
const DuckDuckScrape = require("duck-duck-scrape");
const ddg = new DuckDuckScrape();

module.exports = {
    /**
     * Primeiro o metodo run(client, message, args) será executado pelo nosso arquivo message.js
     * Que passará os argumentos atraves do middleware que programamos.
     */
    run: function(client, message, args) {
        if (args.length < 1) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)

        let result = ddg.search(args.join(" "), 1, "pt-br");

        result.then((data) => {
            let embed = {
                title: data[0].title,
                description: data[0].description,
                url: data[0].url,
                color: 0xB1103C,
                thumbnail: { url: data[0].icon }
            }
            message.channel.send({ embed })
        })
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
            name: 'search',
            aliases: ['buscar, pesquisar'],
            category: 'Utilitário',
            description: 'Pesquisar alguma coisa no DuckDuckGo',
            usage: `search [Como fazer um bot]`
        }
    }
}