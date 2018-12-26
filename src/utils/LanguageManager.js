// LanguageManager.js
// Esse arquivo serve para organizar as linguagens de programação para os cargos do servidor

const fs = require('fs')

module.exports = class LanguageManager {
    // Método que retorna o conteudo do arquivo de configuração das linguagens
    getLanguages () {
        const languages = fs.readFileSync('languages.json', 'utf8');
        return JSON.parse(languages);
    }

    // Adiciona uma linguagem ao arquivo
    addLanguage (name) {
        const languages = this.getLanguages();

        // Se a linguagem já existir, rejeitamos a promise.
        if (langs.includes(name)) return false;

        // Se não existir, adicionamos a linguagem selecionada na array,
        languages.push(name);
    
        // e salvamos o arquivo.
        fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8');

        return true;
    }

    // Remove uma linguagem do arquivo
    removeLanguage (name) {
        // Pegamos a array com as linguagens atuais
        const languages = this.getLanguages();

        // Pegamos o index do elemento a ser removido
        const elementIndex = languages.indexOf(name);

        // Se a linguagem existir (index !== -1),
        if (elementIndex !== -1) {
            // removemos a linguagem da array,
            langs.splice(langs.indexOf(name), 1);

            // e salvamos o arquivo.
            fs.writeFileSync('languages.json', JSON.stringify(langs), 'utf8');
            
            return true;
        } else {
            // Se não existir, rejeitamos a promise.
            return false;
        }
    }
}
