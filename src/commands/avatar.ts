import { CommandContext, Args } from '../framework/command';

export default class {
    name = 'avatar';

    async run(ctx: CommandContext, args: Args) {
        const message = ctx.message;

        if (!message.mentions.users.size) {
            return message.channel.send(
                `> **Seu** avatar 🖼 ${message.author.displayAvatarURL()}`
            )
        }

        const avatarList = message.mentions.users.map(
            user => `> **${user.username}'s** avatar 🖼 ${user.displayAvatarURL()}`
        )

        return message.channel.send(avatarList)
    }
}