import {CommandContext} from '../framework/command';

export default class {
  name = 'ping';

  async run(ctx: CommandContext) {
    await ctx.message.channel.send('Pong!');
  }
}
