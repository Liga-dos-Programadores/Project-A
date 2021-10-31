const Discord = require('discord.js')

module.exports = {
  run: async (client, message, args) => {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> **Você não tem permissão para usar esse comando!**').then(m => m.delete({ timeout: 2000 })) }

    /** Emojis */
    const memberEmoji = message.guild.emojis.cache.get(process.env.SERVER_EMOJI)
    const newsEmoji = message.guild.emojis.cache.get(process.env.NEWS_EMOJI)
    const frontendEmoji = message.guild.emojis.cache.get(process.env.FRONTEND_EMOJI)
    const backendEmoji = message.guild.emojis.cache.get(process.env.BACKEND_EMOJI)
    const fullstackEmoji = message.guild.emojis.cache.get(process.env.FULLSTACK_EMOJI)

    /** Roles */
    const memberRole = message.guild.roles.cache.get(process.env.CARGO_MEMBRO)
    const newsRole = message.guild.roles.cache.get(process.env.NOVIDADES)
    const frontendRole = message.guild.roles.cache.get(process.env.CARGO_FRONTEND)
    const backendRole = message.guild.roles.cache.get(process.env.CARGO_BACKEND)
    const fullstackRole = message.guild.roles.cache.get(process.env.CARGO_FULLSTACK)

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setAuthor('Cargos!')
      .setDescription(`
        Reaja para obter os cargos! Obs: O cargo **Membro** é o mais importante!
        \n\n${memberEmoji} - **Cargo ${memberRole}**
        \n\n${newsEmoji} - **Cargo ${newsRole}**
        \n\n${frontendEmoji} - **Cargo ${frontendRole}**
        \n\n${backendEmoji} - **Cargo ${backendRole}**
        \n\n${fullstackEmoji} - **Cargo ${fullstackRole}**\n\n`)

    const msg = await message.channel.send(embed)
    msg.react(`${memberEmoji}`)
    msg.react(`${newsEmoji}`)
    msg.react(`${frontendEmoji}`)
    msg.react(`${backendEmoji}`)
    msg.react(`${fullstackEmoji}`)

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch()
      if (reaction.partial) await reaction.fetch()
      if (user.bot || !reaction.message.guild) return
      if (reaction.message.id !== msg.id) return

      const userReact = await reaction.message.guild.members.cache.get(user.id)

      switch (reaction.emoji) {
      case memberEmoji:
        await userReact.roles.add(memberRole).catch(console.error)
        break

      case newsEmoji:
        await userReact.roles.add(newsRole).catch(console.error)
        break

      case frontendEmoji:
        await userReact.roles.add(frontendRole).catch(console.error)
        break

      case backendEmoji:
        await userReact.roles.add(backendRole).catch(console.error)
        break

      case fullstackEmoji:
        await userReact.roles.add(fullstackRole).catch(console.error)
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

      const userReact = await reaction.message.guild.members.cache.get(user.id)

      switch (reaction.emoji) {
      case memberEmoji:
        await userReact.roles.remove(memberRole).catch(console.error)
        break

      case newsEmoji:
        await userReact.roles.remove(newsRole).catch(console.error)
        break

      case frontendEmoji:
        await userReact.roles.remove(frontendRole).catch(console.error)
        break

      case backendEmoji:
        await userReact.roles.remove(backendRole).catch(console.error)
        break

      case fullstackEmoji:
        await userReact.roles.remove(fullstackRole).catch(console.error)
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
