// Comando resposanvel pela administracao do bot
const languagemanager = require("../utils/languagemanager");
const langmgr = new languagemanager();


exports.run = (client, message, args) => {

    /** Verifica se o membro possui permissão para administrar roles. */
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Você não pode fazer isto :c');

    if (args.length == 2) {
        const name = args[1];
        var langs = langmgr.getLanguages();
        if (args[0] == "addlang") {
            // Checamos se a linguagem nao existe no arquivo de configuracao
            if (!langs.includes(name)) {
                // Checamos se a role existe no servidor
                if (message.guild.roles.find("name", name)) {
                    langmgr.addLanguage(name).then(() => {
                        message.reply("Linguagem adicionada.");
                    }).catch(() => {
                        message.reply("Algo de errado nao esta certo, nao consegui adicionar essa linguagem.");
                    });
                } else {
                    
                    message.guild.createRole({name}).then(() => {
                        if (langmgr.addLanguage(name)) {
                            message.reply("Linguagem adicionada.");
                        } else {
                            message.reply("Algo de errado nao esta certo, nao consegui adicionar essa linguagem.");
                        }
                    });
                }
            } else {
                // Linguagem existe
                message.reply("Essa linguagem ja existe!");
            }
        } else if (args[0] == "remlang") {
            // Checamos se a linguagem existe no arquivo de configuracao
            if (langs.includes(name)) {
                // Checamos se a role existe no servidor
                var role = message.guild.roles.find("name", name);
                if (role) {
                    role.delete().then(() => {
                        langmgr.removeLanguage(name).then(() => {
                            message.reply("Linguagem removida");
                        }).catch(() => {
                            message.reply("Algo de errado nao esta certo, nao consegui remover essa linguagem.");
                        });
                    }).catch((err) => {
                        throw err;
                    });
                } else {
                    langmgr.removeLanguage(name).then(() => {
                        message.reply("Linguagem removida");
                    }).catch(() => {
                        message.reply("Algo de errado nao esta certo, nao consegui remover essa linguagem.");
                    });
                }
            } else {
                // Linguagem existe
                message.reply("Essa linguagem nao existe!");
            }
        }
    } else {
        return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${message.settings.PREFIX}${this.help.usage}\`\`\``);
    }
}

exports.conf = {

}

exports.help = {
    name:"config",
    categorie: "Moderação",
    description: "Altera as configuracoes do bot.",
    usage:"config [addlang (name|role)|remlang role]"
}
