if (process.version.slice(1).split(".")[0] < 8)
  throw new Error(
    "Node 8.0 ou superior é necessário. Atualize o Node em seu sistema"
  );

require("dotenv").config();

const { Client, Collection } = require("discord.js");
const { readdirSync, lstatSync } = require("fs");
const Enmap = require("enmap");
const client = new Client();

client.commands = new Collection();
client.startTime = Date.now();

// TODO: Treat errors in those functions //
loadCommands(client.commands, "./commands");
loadEvents("./events", client);
/*
 * Carrega commandos que estão na pasta **commands** e em grupos de subpastas
 */
function loadCommands(collection, directory) {
  const cmdFiles = readdirSync(directory);
  console.log(
    "log",
    `Carregando o total de ${cmdFiles.length} comandos em ${directory}`
  );

  for (const file of cmdFiles) {
    try {
      const path = `${directory}/${file}`;

      if (file.endsWith(".js")) {
        const command = require(path);

        console.log("log", `Carregando comando: ${command.help.name}`);

        collection.set(command.help.name, command);

        if (command.help.aliases)
          command.help.aliases.forEach((alias) =>
            collection.set(alias, command)
          );
      } else if (lstatSync(path).isDirectory()) {
        loadCommands(collection, path);
      }
    } catch (e) {
      console.log(`Impossivel executar comando ${file}: ${e}`);
    }
  }
}

function loadEvents(directory, client) {
  const eventFiles = readdirSync(directory);
  console.log("log", `Carregando o total de ${eventFiles.length} eventos`);
  for (let file of eventFiles) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);

    client.on(eventName, event.bind(null, client));
  }
}

client.login(process.env.AUTH_TOKEN); /* Inicia o Bot. */
