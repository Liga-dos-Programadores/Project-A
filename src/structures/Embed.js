// Iremos usar o RichEmbed, que se f*da usar
// o embed numa única função 
const { RichEmbed } = require('discord.js');

module.exports = class Embed extends RichEmbed {
    constructor (user, data = {}) {
        super(data)
        this.setColor(process.env.EMBED_COLOR).setTimestamp(); // Cor que irá ser definida no embed
        if (user) this.setFooter(user.tag);                    // Se um user for encontrado, adicionar a tag do mesmo no footer do embed
    }
}