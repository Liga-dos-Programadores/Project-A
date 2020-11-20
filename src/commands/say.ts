import {CommandContext} from '../framework/command';

export default class {
  name = 'say';

  async run(ctx: CommandContext, args: string[]) {
    const message = ctx.message;

    if (!message.member!.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) {
      return message.channel.send('> Você não pode usar esse comando!');
    }

    message.delete();

    const content = args.join(' ');

    return await message.channel.send(content);
  }
}
