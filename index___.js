/** Verificação da versão do Node */
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0 ou superior é necessário. Atualize o Node em seu sistema.');

/** Verificação do arquivo .env */
require('dotenv').config();


const Discord = require('discord.js');
const client = new Discord.Client();

const { readdirSync } = require('fs');
const Enmap = require('enmap');

client.commands = new Enmap();
client.startTime = Date.now();

// const commandsFiles = readdirSync('./commands/');
// console.log('>>', `Carregando ${commandsFiles.length} comandos:`);

// commandsFiles.forEach(f => {
// 	try {
// 	  const props = require(`./commands/${f}`);
// 		if (f.split('.').slice(-1)[0] !== 'js') return;

// 		console.log('', `Carregando o comando: ${props.help.name}`);

// 		if (props.init) props.init(client);

// 		client.commands.set(props.help.name, props);
// 		if (props.help.aliases) {
// 			props.alias = true;
// 			props.help.aliases.forEach(alias => client.commands.set(alias, props));
// 		}
// 	}
// 	catch (e) {
// 		console.log(`Impossivel executar comando ${f}: ${e}`);
// 	}
// });

// const eventsFiles = readdirSync('./events/');
// console.log('log', `Carregando o total de ${eventsFiles.length} eventos`);
// eventsFiles.forEach(f => {
// 	const eventName = f.split('.')[0];
// 	const event = require(`./events/${f}`);

// 	client.on(eventName, event.bind(null, client));
// });
const commandsFiles = readdirSync('./commands/');
console.log('>>', `Carregando ${commandsFiles.length} comandos.`);

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  if (message.content.startsWith(`<@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;

  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0];
  command = command.slice(process.env.PREFIX.length);

  try {
    let commandsFile = require(`./commands/${command}.js`);
    delete require.cache[require.resolve(`./commands/${command}.js`)];
    return commandsFile.run(client, message, args);
  } catch (err) {
    console.error("Erro: " + err);
  }
});

client.login(process.env.AUTH_TOKEN);