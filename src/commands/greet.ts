import {CommandContext, Args} from '../framework/command';

export default class {
    name = 'greet';

    async run(ctx: CommandContext, args: Args) {
        const name = args.getString('name');
        await ctx.message.channel.send(`Hello, ${name}!`);
    }
}
