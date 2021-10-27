const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }

    /** Emojis */
    const memberEmoji = process.env.SERVER_EMOJI
    const frontendEmoji = process.env.FRONTEND_EMOJI
    const backendEmoji = process.env.BACKEND_EMOJI
    const fullstackEmoji = process.env.FULLSTACK_EMOJI

    /** Roles */
    const memberRole = message.guild.roles.cache.get(process.env.CARGO_MEMBRO)
    const frontendRole = message.guild.roles.cache.get(process.env.CARGO_FRONTEND)
    const backendRole = message.guild.roles.cache.get(process.env.CARGO_BACKEND)
    const fullstackRole = message.guild.roles.cache.get(process.env.CARGO_FULLSTACK)

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setAuthor('Cargos!')
      .setDescription(`Reaja para obter os cargos! Obs: O cargo **Membro** é o mais importante!\n\n${memberEmoji} - **Cargo ${memberRole}**\n\n${frontendEmoji} - **Cargo ${frontendRole}**\n\n${backendEmoji} - **Cargo ${backendRole}**\n\n${fullstackEmoji} - **Cargo ${fullstackRole}**\n\n`)

    const msg = await message.channel.send(embed)
    msg.react(`${memberEmoji}`)
    msg.react(`${frontendEmoji}`)
    msg.react(`${backendEmoji}`)
    msg.react(`${fullstackEmoji}`)

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.bot || !reaction.message.guild) return
      if (reaction.message.id !== msg.id) return

      switch (reaction.emoji.name) {
      case memberEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.add(memberRole).catch(console.error)
        break

      case frontendEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.add(frontendRole).catch(console.error)
        break

      case backendEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.add(backendRole).catch(console.error)
        break

      case fullstackEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.add(fullstackRole).catch(console.error)
        break

      default:
        break
      }
    })

    client.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.bot) return
      if (!reaction.message.guild) return
      if (reaction.message.id !== msg.id) return

      switch (reaction.emoji.name) {
      case memberEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.remove(memberRole).catch(console.error)
        break

      case frontendEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.remove(frontendRole).catch(console.error)
        break

      case backendEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.remove(backendRole).catch(console.error)
        break

      case fullstackEmoji:
        await reaction.message.guild.members.cache.get(user.id).roles.remove(fullstackRole).catch(console.error)
        break

      default:
        break
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
