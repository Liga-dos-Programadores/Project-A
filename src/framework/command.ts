import {Client, Message} from 'discord.js';

export interface CommandContext {
    client: Client;
    message: Message;
}

export interface Command {
    name: string;

    run(ctx: CommandContext, args: Args): void;
}

type ArgsErrorType = 'notFound' | 'notMultiple' | 'notString' | 'notBool';

export class ArgsError extends Error {
    constructor(public errorType: ArgsErrorType, public target: string) {
        super(`${errorType}: ${target}`);
        Object.setPrototypeOf(this, ArgsError.prototype);
    }
}

export class Args {
    constructor(public args: Map<string, string[]>) {}

    //
    // Base
    //

    getBool(ident: string): boolean {
        const res = this.args.get(ident);

        if (res === undefined) return false;
        if (res.length > 1 || res[0] !== '')
            throw new ArgsError('notBool', ident);

        return true;
    }

    getOptStrings(ident: string): string[] {
        const res = this.args.get(ident);

        // TODO: Return `string[]?` or `string[]`?
        if (res === undefined) return [];
        if (res.length === 1 && res[0] === '')
            throw new ArgsError('notString', ident);

        return res;
    }

    //
    // Extension
    //

    getString(ident: string): string {
        const res = this.getOptString(ident);

        if (res === null) throw new ArgsError('notFound', ident);

        return res;
    }

    getStrings(ident: string): string[] {
        const res = this.getOptStrings(ident);

        // TODO: Maybe use classes for these instead of plain strings?
        if (res.length === 0) throw new ArgsError('notFound', ident);

        return res;
    }

    getOptString(ident: string): string | null {
        const res = this.getOptStrings(ident);

        if (res.length === 0) return null;
        if (res.length > 1) throw new ArgsError('notMultiple', ident);

        return res[0];
    }
}
