/**
 * THE MIT LICENSE.
 * 
 * Copyright 2017 A Liga dos Programadores
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/** Cheque se a versão do node.js é a 8.0.0 ou acima */
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

/** Carrega o discord.js */
const Discord = require('discord.js');
/** Carrega outros modulos uteis */
const { promisify } = require('util');
const readdir = promisify(require("fs").readdir);
const Enmap = require('enmap');

/** Instancia o Client do Discord. */
const client = new Discord.Client();
/** Arquivo de configuração com token e outras coisas */
client.settings = require('./config')

/** Instancia de uma nova collection de comandos. */
client.commands = new Enmap();

const init = async () => 
{

  /** Carregamos os commandos como uma collection. */
  const cmdFiles = await readdir("./commands/");
  console.log("log", `Carregando o total de ${cmdFiles.length} comandos.`);
  /** Para cada comando então é registrado na memoria,
   *  e monstrado ao console que o comando foi carregado com sucesso. */
  cmdFiles.forEach(f => 
  {
    try 
    {
      const props = require(`./commands/${f}`);
      if (f.split('.').slice(-1)[0] !== "js") return;

      console.log("log", `Carregando comando: ${props.help.name}`);
      if (props.init) 
      {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
    }
    catch (e) 
    {
      console.log(`Impossivel executar comando ${f}: ${e}`);
    }
  });

  /** Então carregamos o evento quase do mesmo modo que o processo dos comandos. */
  const evtFiles = await readdir("./events/");
  console.log("log", `Carregando o total de ${evtFiles.length} eventos`);
  evtFiles.forEach(f => 
  {
    const eventName = f.split('.')[0];
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
  });

  /** Então finalmente iniciamos o Bot. */
  client.login(process.env.TOKEN);

};

init();
