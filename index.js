<<<<<<< HEAD
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const prefix = process.env.PREFIX

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.on('ready', () => {
    client.user.setActivity(`${process.env.PREFIX}help`)
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})
=======
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0 ou superior é necessário. Atualize o Node em seu sistema')

require('dotenv').config()

const { Client, Collection } = require('discord.js')
const { readdirSync, lstatSync } = require('fs')
const Enmap = require('enmap')
const client = new Client()

client.commands = new Collection()
client.startTime = Date.now()

loadCommands(client.commands, './commands');
loadEvents('./events');
/* 
	* Carrega commandos que estão na pasta **commands** e em grupos de subpastas
*/
function loadCommands(collection, directory) {
	const cmdFiles = readdirSync(directory);
	console.log('log', `Carregando o total de ${cmdFiles.length} comandos em ${directory}`)

	for (const file of cmdFiles) {
		try {
			const path = `${directory}/${file}`;

			if (file.endsWith('.js')) {
				const command = require(path);

				console.log('log', `Carregando comando: ${command.help.name}`)

				collection.set(command.help.name, command);

				if (command.help.aliases)
					command.help.aliases.forEach(alias => collection.set(alias, command))
			}
			else if (lstatSync(path).isDirectory()) {
				loadCommands(collection, path);
			}
		}
		catch (e) {
			console.log(`Impossivel executar comando ${file}: ${e}`)
		}
	}
};

function loadEvents(directory) {
	const eventFiles = readdirSync(directory)
	console.log('log', `Carregando o total de ${eventFiles.length} eventos`)
	for (let file of eventFiles) {
		const eventName = file.split('.')[0]
		const event = require(`./events/${file}`)

		client.on(eventName, event.bind(null, client))
	}
}

>>>>>>> 833ad58dfa8ccf3972d0b3e9d62cf44b243fad5c

/** Se não tiver bugs e o token estiver acessível bot irá ligar */
client.login(process.env.AUTH_TOKEN);