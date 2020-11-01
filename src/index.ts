import * as Discord from 'discord.js';
import {config} from 'dotenv';

import registerEvents from './events';

const client = new Discord.Client();
registerEvents(client);

config();
client.login(process.env.DISCORD_TOKEN);
