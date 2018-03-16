// LanguageManager
// Esse arquivo serve para organizar as linguagens de programacao para os cargos do servidor

const fs = require('fs');

class LanguageManager {
    // Metodo que retorna o conteudo do arquivo de configuracao das linguagens
    getLanguages() {
        var langs = fs.readFileSync('languages.json', 'utf8');
        return JSON.parse(langs);
    }
    // Adiciona uma linguagem ao arquivo
    addLanguage(name) {
        // Criamos uma promise ja que a funcao writeFile e async (talvez seja melhor implementar a writeFileSync aqui)
        return new Promise((resolve, reject) => {
            // Pegamos a array com as linguagens atuais
            var langs = this.getLanguages();
            // se incluir a linguagem a ser adicionada, rejeitamos a promise
            if (langs.includes(name))
            {
                reject();
            }
            // Adicionamos a linguagem selecionada na array
            langs.push(name);
            // Salvamos o arquivo
            fs.writeFile('languages.json', JSON.stringify(langs), (err) => {
                if (err) reject();
                resolve();
            });
        });
    }
    // Remove uma linguagem do arquivo
    removeLanguage(name) {
        // Criamos uma promise ja que a funcao writeFile e async (talvez seja melhor implementar a writeFileSync aqui)
        return new Promise((resolve, reject) => {
            // Pegamos a array com as linguagens atuais
            var langs = this.getLanguages();
            // Pegamos o index do elemento a ser removido
            var idx = langs.indexOf(name);
            // Se a linguagem existir (index != -1)
            if(idx != -1)
            {
                // Removemos a linguagem da array
                langs.splice(langs.indexOf(name), 1);
            }
            else
            {
                // Se nao existir rejeitamos a promise
                reject();
            }
            fs.writeFile('languages.json', JSON.stringify(langs), 'utf8', (err) => {
                // Salvamos o arquivo
                if (err) reject();
                resolve();
            });
        });
    }
}

module.exports = LanguageManager;