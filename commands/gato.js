const Discord = require('discord.js')
const https = require('https')

const api = 'https://aws.random.cat/meow'
const titles = [
  'Lindo gatinho',
  'Meow!',
  'Pare de procrastinar.',
  'Aproveitando bem o dia!',
  'Sim.',
  'A mimir?'
]

function randomTitle() {
  if (titles.length === 0)
    return undefined
  
  const index = Math.floor(Math.random() * titles.length)
  return titles[index]
}

module.exports = {

  run: async (client, message, args) => {
    
    https.get(api, {}, (res) => {
      let data = ''
      
      // If it wasn't successful
      if (res.statusCode != '200') {
        message.reply('Infelizmente eu não consegui pegar uma foto de gato para você. 😔')
        return
      }
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        let response = JSON.parse(data)
        
        const embed = new Discord.RichEmbed()
          .setTitle(randomTitle() + ' 🐱')
          .setImage(response.file)
          .setColor(message.member ? message.member.displayColor : global.CLIENT_DEFAULT_COLOR)

        message.channel.send(embed)
      })
    }).on('error', (error) => console.log(error))
    
  },

  conf: {},

  get help () {
    return {
      name: 'gato',
      description: 'Envia um gif ou uma imagem aleatória de um ou mais gatos! API: ' + api,
      usage: 'gato',
      category: 'Imagem'
    }
  }
}
