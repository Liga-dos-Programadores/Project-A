import requireAll from 'require-all';
import {Client, Message} from 'discord.js';

import {Command, CommandContext, Args, ArgsError} from './command';

const COMMAND_REGEX = /^\w(?:[\w-]*\w)*$/;

type Constructor<T> = {
    new (): T;
};

class ArgsBuilder {
    currentCommand = '';
    currentArgs: string[] = [];
    args = new Map<string, string[]>();

    registerState() {
        let currentArgs = this.currentArgs;
        if (currentArgs.length === 0) currentArgs = [''];
        this.args.set(this.currentCommand, currentArgs);
        this.currentArgs = [];
    }

    append(slice: string): ArgsBuilder {
        if (slice.startsWith('--')) {
            const param = slice.slice(2);

            // TODO: Properly handle nameless param
            if (param === '') throw 'bah';

            this.registerState();
            this.currentCommand = param;
        } else {
            this.currentArgs.push(slice);
        }

        return this;
    }

    build(): Args {
        this.registerState();
        return new Args(this.args);
    }
}

export class CommandManager {
    commands: Map<string, Command> = new Map();

    constructor(public prefix: string) {
        // TODO: Properly handle invalid prefix
    }

    async onMessage(client: Client, message: Message) {
        const messageContent = message.content;

        if (!messageContent.startsWith(this.prefix)) return;

        const content = messageContent.slice(this.prefix.length);
        const slices = content.split(' ').filter(it => it !== '');

        const ident = slices.shift();
        if (ident === undefined) return;

        const command = this.commands.get(ident);
        if (command === undefined)
            return this.onMessageErrorNotFound({client, message}, ident);

        const args = slices.reduce(
            (acc, it) => acc.append(it),
            new ArgsBuilder()
        );

        try {
            await command.run({client, message}, args.build());
        } catch (e) {
            if (e instanceof ArgsError)
                return this.onMessageErrorInvalidArgs({client, message}, e);
            else throw e;
        }
    }

    // Blanket events
    // TODO: Better defaults
    onMessageErrorNotFound(ctx: CommandContext, ident: string) {
        console.log('onMessageErrorNotFound', ctx.message.id, ident);
    }

    onMessageErrorInvalidArgs(ctx: CommandContext, error: ArgsError) {
        console.log('onMessageErrorInvalidArgs', ctx.message.id, error.message);
    }

    async registerAll(dirname: string) {
        const modules = await requireAll({dirname});
        for (const name in modules) {
            const instance = new modules[name].default();
            if (!COMMAND_REGEX.test(name)) throw 'bah';
            this.commands.set(instance.name, instance);
        }
    }
}
