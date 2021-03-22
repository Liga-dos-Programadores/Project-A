require('dotenv').config()

module.exports = (Discord, client, message) => {
  if(!message.content.startsWith(process.env.PREFIX) || message.author.bot ) return;
  const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);

  if(command) command.execute(client, message, args, Discord);
}