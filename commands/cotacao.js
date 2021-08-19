module.exports = {
	name: 'cotacao',
	description: 'Te mostra em tempo real a cotação de algumas moedas',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`Você não disse valores suficientes, ${message.author}!`);
		} 

        var moeda = (args[0]).toUpperCase()
        
        if(moeda === "USD"){

        const fetch = require("node-fetch")

        var api = `https://economia.awesomeapi.com.br/json/last/USD-BRL`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            var preco = data.USDBRL.ask;
            message.reply(`a cotação de 1 USD está em ${preco} BRL`)});
	}
    else if(moeda === "EUR"){

        const fetch = require("node-fetch")

        var api = `https://economia.awesomeapi.com.br/json/last/EUR-BRL`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            var preco = data.EURBRL.ask;
            message.reply(`a cotação de 1 EUR está em ${preco} BRL`)});
	}
    else if(moeda === "BTC"){

        const fetch = require("node-fetch")

        var api = `https://economia.awesomeapi.com.br/json/last/BTC-BRL`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            var preco = data.BTCBRL.ask;
            message.reply(`a cotação de 1 BTC está em ${preco} BRL` )});
	}
    else if(moeda === "ETH"){

        const fetch = require("node-fetch")

        var api = `https://economia.awesomeapi.com.br/json/last/ETH-BRL`
        fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            var preco = data.ETHBRL.ask;
            message.reply(`a cotação de 1 BTC está em ${preco} BRL` )});
	}
},
};
