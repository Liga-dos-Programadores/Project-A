import {CommandContext, Args} from '../framework/command';

export default class {
    name = 'test-args';

    async run(ctx: CommandContext, args: Args) {
        // Bool
        const singleBool = args.getBool('single-bool');

        // Required
        const single = args.getString('single');
        const multiple = args.getStrings('multiple');

        // Optional
        const optSingle = args.getOptString('opt-single');
        const optMultiple = args.getOptStrings('opt-multiple');

        // Main
        const res = [];
        res.push(`Boolean: ${singleBool}`);
        res.push(`Single string: ${single}`);
        res.push(`Multiple strings: ${multiple}`);

        if (optSingle) res.push(`Optional single string: ${optSingle}`);
        if (optMultiple.length > 0)
            res.push(`Optional multiple strings: ${optMultiple}`);

        await ctx.message.channel.send(res.join('\n'));
    }
}
