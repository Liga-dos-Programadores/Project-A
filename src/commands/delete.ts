import { TextChannel } from 'discord.js';
import { CommandContext, Args } from '../framework/command';

export default class {
    name = 'delete';

    async run(ctx: CommandContext, args: Args) {
        const message = ctx.message;

        if (!message.member)
            return
        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return await message.reply('você não tem permissão para usar esse comando!')

        let limit = parseInt(args.getString("n"));
        if (!Number.isInteger(limit))
            return await message.reply(`Não é número`)

        limit = Math.min(limit, 99);

        return await (message.channel as TextChannel).bulkDelete(limit)
            .then(messages => {
                message.channel.send(`${messages.size} mensagens foram deletadas!`)
                    .then(message => setTimeout(() => message.delete(), 2000))
            })
    }
}
