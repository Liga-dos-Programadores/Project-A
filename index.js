if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

require('dotenv').config()

const Discord = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client() 

client.commands = new Enmap()
client.startTime = Date.now()

const cmdFiles = readdirSync('./commands/')
console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)

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

client.on('raw', async dados => {
  if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  if(dados.d.message_id != "677244773983060011") return

  let servidor = client.guilds.get("674227220981612544")
  let membro = servidor.members.get(dados.d.user_id)

  let cargo = servidor.roles.get('674702830442905601')

  if(dados.t === "MESSAGE_REACTION_ADD") {
    if(dados.d.emoji.id === "674620037402722355") {
      if (membro.roles.has(cargo)) return ("Você já tem esse cargo")
      membro.addRole(cargo)
    } 
  }

  if(dados.t === "MESSAGE_REACTION_REMOVE") {
    if(dados.d.emoji.id === "674620037402722355") {
      if (membro.roles.has(cargo)) return
      membro.removeRole(cargo)
    } 
  }

});

client.login(process.env.AUTH_TOKEN) /* Inicia o Bot. */
