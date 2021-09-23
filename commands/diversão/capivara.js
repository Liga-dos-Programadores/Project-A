/**
 * O Comando "capivara" envia um gif ou uma imagem aleatória de um ou mais capivaras.
*/

const Discord = require('discord.js')
const axios = require('axios').default

const capivaraURL = `https://api.tenor.com/v1/random?&key=${process.env.TENOR_TOKEN}&q=capivara&contentfilter=high&limit=1`

const titles = [
  'Linda capivara',
  '() faz quem som mesmo?!',
  'Pare de procrastinar.',
  'Aproveitando bem o dia!',
  'Sim.',
  'Tem gente que acha que sou um cachorro >:(',
]

function randomTitle() {
  if (titles.length === 0) { return undefined }
  const index = Math.floor(Math.random() * titles.length)
  return titles[index]
}

module.exports = {

  run: async (client, message, args) => {
    try {
      const response = await axios.get(capivaraURL)
      const embed = new Discord.MessageEmbed()
        .setAuthor(randomTitle() + ' 🐶')
        .setImage(response.data.results[0].media[0].gif.url)
        .setColor(process.env.COLOR)
        .setFooter('2021 © Liga dos Programadores', 'https://i.imgur.com/Mu4KEVh.png?width=200,height=200')
        .setTimestamp()
      message.channel.send(embed)
    } catch (error) {
      message.reply('Infelizmente eu não consegui pegar uma foto de capivara para você. 😔')
    }
  },

  conf: {},

  get help() {
    return {
      name: 'capivara',
      description: 'Envia um gif ou uma imagem aleatória de um ou mais capivaras! API: https://api.thecatapi.com/v1/images/get',
      usage: '!cat',
      category: 'Diversão',
    }
  },
}
