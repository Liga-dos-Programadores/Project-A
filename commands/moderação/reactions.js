const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }
    
    // const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]})
    
    /** Channel */
    const rolesChannel = message.guild.channels.cache.find((channel) => channel.id === process.env.CANAL_CARGOS)

    /** Emojis */
    const memberEmoji = message.guild.emojis.cache.get(process.env.SERVER_EMOJI)
    const frontendEmoji = message.guild.emojis.cache.get(process.env.FRONTEND_EMOJI)
    const backendEmoji = message.guild.emojis.cache.get(process.env.BACKEND_EMOJI)
    const fullstackEmoji = message.guild.emojis.cache.get(process.env.FULLSTACK_EMOJI)
    
    /** Roles */
    const memberRole = process.env.CARGO_MEMBRO
    const frontendRole = process.env.CARGO_FRONTEND
    const backendRole = process.env.CARGO_BACKEND
    const fullstackRole = process.env.CARGO_FULLSTACK

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setAuthor('Cargos!')
      .setDescription(`Reaja para obter os cargos! Obs: O cargo **Membro** é o mais importante!\n\n${memberEmoji} - **Cargo @${memberRole}**\n\n${frontendEmoji} - **Cargo Front-End**\n\n${backendEmoji} - **Cargo Back-End**\n\n${fullstackEmoji} - **Cargo Full-Stack**\n\n`)

    const msg = await message.channel.send(embed)
    msg.react(`${memberEmoji}`)
    msg.react(`${frontendEmoji}`)
    msg.react(`${backendEmoji}`)
    msg.react(`${fullstackEmoji}`)

    client.on("messageReactionAdd", (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.client) return
      if (!reaction.message.guild) return

      if (reaction.message.id == rolesChannel) {
        if (reaction.emoji.id == memberRole) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(memberRole)
        }
      } else {
        return
      }
    })

    client.on("messageReactionRemove", (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.client) return
      if (!reaction.message.guild) return

      if (reaction.message.id == rolesChannel) {
        if (reaction.emoji.id == memberRole) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(memberRole)
        }
      } else {
        return
      }
    })
  },
  conf: {},

  get help() {
    return {
      name: 'reactions',
      category: 'Moderação',
      description: 'Reações para obter cargo.',
      usage: '!reactions',
      admin: true,
    }
  },
}
