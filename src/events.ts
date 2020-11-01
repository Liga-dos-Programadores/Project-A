import {Client} from 'discord.js';
import {join} from 'path';

import {CommandManager} from './framework/index';
import {CommandContext, ArgsError} from './framework/command';

export const cm = new CommandManager(process.env.BOT_PREFIX ?? '!');

cm.onMessageErrorNotFound = async function (
    ctx: CommandContext,
    ident: string
) {
    await ctx.message.channel.send(`Comando não encontrado: ${ident}`);
};

cm.onMessageErrorInvalidArgs = async function (
    ctx: CommandContext,
    error: ArgsError
) {
    let res;
    const ident = error.target;
    switch (error.errorType) {
        case 'notFound':
            res = `${ident} não encontrado!`;
            break;
        case 'notMultiple':
            res = `${ident} deve ser único!`;
            break;
        case 'notString':
            res = `${ident} deve ser string!`;
            break;
        case 'notBool':
            res = `${ident} deve ser booleano!`;
            break;
    }

    await ctx.message.channel.send(`Argumento inválido: ${res}`);
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
