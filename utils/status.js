let currentPresence = 0;

/**
 *
 * @param {Client} client
*/

async function run(client) {
	let presence = presences[currentPresence];
	if (typeof presence === 'function') {
		presence = presence(client);
	}

	console.log(`Atualizando status para '${presence.name}'`);
	client.user.setActivity({
		game: presence,
		status: 'online',
	});

	currentPresence++;
	if (currentPresence >= presences.length) {
		currentPresence = 0;
	}

	setTimeout(() => run(client), 60000);
}
/**
  * @type {(DiscordRichPresence|DiscordRichPresenceSupplier)[]}
*/

const presences = [
	{
		name: 'Compartilhe a comunidade com seus amigos!',
		url: 'https://discord.gg/3avc6QU',
		type: 0,
	},
	{
		name: 'Para saber meus comandos digite !help',
		type: 0,
	},
	(client) => ({
		name: `${client.users.cache.size} usuários nesta comunidade!`,
		type: 3,
	}),
];

/**
 * @callback DiscordRichPresenceSupplier
 * @param {Client} client
 * @returns {DiscordRichPresenceGame}
 */

/**
 * @typedef DiscordRichPresence
 * @type {object}
 * @property {DiscordRichPresenceGame} game - The game presence.
 */

/**
 * @typedef DiscordRichPresenceGame
 * @type {object}
 * @property {string} name - The game name.
 * @property {string} [url] - The url.
 * @property {number} type - The type of the game.
 */

module.exports.run = run;
