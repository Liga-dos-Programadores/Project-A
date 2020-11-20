import requireAll from 'require-all';
import {Client, Message} from 'discord.js';

import {Command, CommandContext} from './command';

const COMMAND_REGEX = /^\w(?:[\w-]*\w)*$/;

type Constructor<T> = {
  new (): T;
};

export class CommandManager {
  commands: Map<string, Command> = new Map();

  constructor(public prefix: string) {
    // TODO: Properly handle invalid prefix
  }

  async onMessage(client: Client, message: Message) {
    const messageContent = message.content;

    if (!messageContent.startsWith(this.prefix)) return;

    const content = messageContent.slice(this.prefix.length);
    const args = content.split(' ').filter(it => it !== '');

    const name = args.shift();
    if (!name) return;

    const command = this.commands.get(name);
    if (!command) return this.onMessageErrorNotFound({client, message}, name);

    // try {
    await command.run({client, message}, args);
    // } catch (e) {
    //   throw e;
    // }
  }

  // Blanket events
  // TODO: Better defaults
  onMessageErrorNotFound(ctx: CommandContext, ident: string) {
    console.log('onMessageErrorNotFound', ctx.message.id, ident);
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
