import { CommandContext, Args } from '../framework/command';

export default class {
    name = 'say';

    async run(ctx: CommandContext, args: Args) {
        const message = ctx.message;

        if (!message.member!.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não pode usar esse comando!') }

        let argsresult;
        const mChannel = message.mentions.channels.first();

        message.delete()
        if (mChannel) {
            argsresult = args.getStrings("content").join(' ')
            return await mChannel.send(argsresult)
        } else {
            argsresult = args.getStrings("content")
            return await message.channel.send(argsresult)
        }
    }
}
