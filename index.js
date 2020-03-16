/** Inicia o dotenv */
require('dotenv').config()

/** Cheque se a versão do node.js é a 8.0.0 ou acima */
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

/** Carrega o discord.js */
const Discord = require('discord.js')
/** Carrega outros modulos uteis */
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const config = require('./config.json');

/** Instancia o Client do Discord. */
const client = new Discord.Client()

/** Instancia de uma nova collection de comandos. */
client.commands = new Enmap()

// Guarda o timestamp do inicio para medir o uptime
client.startTime = Date.now()

/** Carregamos os commandos como uma collection. */
const cmdFiles = readdirSync('./commands/')
console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)
/** Para cada comando então é registrado na memoria,
 *  e monstrado ao console que o comando foi carregado com sucesso. */
cmdFiles.forEach(f => {
  try {
    const props = require(`./commands/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('log', `Carregando comando: ${props.help.name}`)

    if (props.init) props.init(client)

    client.commands.set(props.help.name, props)
    if (props.help.aliases) {
      props.alias = true
      props.help.aliases.forEach(alias => client.commands.set(alias, props))
    }
  } catch (e) {
    console.log(`Impossivel executar comando ${f}: ${e}`)
  }
})

/** Então carregamos o evento quase do mesmo modo que o processo dos comandos. */
const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})

client.on('error', (err) => {
  console.log('error', err)
})

/** Então finalmente iniciamos o Bot. */
client.login(config.token)
