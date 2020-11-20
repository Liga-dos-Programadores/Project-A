import {Client, Message} from 'discord.js';

export interface CommandContext {
    client: Client;
    message: Message;
}

export interface Command {
    name: string;

    run(ctx: CommandContext, args: string[]): void;
}
