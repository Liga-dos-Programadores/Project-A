// LanguageManager
// Esse arquivo serve para organizar as linguagens de programacao para os cargos do servidor

const fs = require('fs');

class LanguageManager {
    getLanguages() {
        var langs = fs.readFileSync('languages.json', 'utf8');
        return JSON.parse(langs);
    }
    addLanguage(name) {
        return new Promise((resolve, reject) => {
            var langs = this.getLanguages();
            if (langs.includes(name)) {
                reject();
            }
            langs.push(name);
            fs.writeFile('languages.json', JSON.stringify(langs), (err) => {
                if (err) reject();
                resolve();
            });
        });
    }
    removeLanguage(name) {
        return new Promise((resolve, reject) => {
            var langs = this.getLanguages();
            if(langs.indexOf(name) != -1) {
                langs.splice(langs.indexOf(name), 1);
            } else {
                reject();
            }
            fs.writeFile('languages.json', JSON.stringify(langs), 'utf8', (err) => {
                if (err) reject();
                resolve();
            });
        });
    }
}

module.exports = LanguageManager;