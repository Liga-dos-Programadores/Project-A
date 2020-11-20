import {Client} from 'discord.js';
import {join} from 'path';

import {CommandManager} from './framework/index';
import {CommandContext} from './framework/command';

export const cm = new CommandManager(process.env.BOT_PREFIX ?? '!');

cm.onMessageErrorNotFound = async function (
  ctx: CommandContext,
  ident: string
) {
  await ctx.message.channel.send(`Comando não encontrado: ${ident}`);
};

export default function (client: Client) {
  client.on('ready', async () => {
    await cm.registerAll(join(__dirname, 'commands'));

    const user = client.user!;
    console.log(`Logged as ${user.username}#${user.discriminator}`);
  });

  client.on('message', async message => {
    cm.onMessage(client, message);
  });
}
