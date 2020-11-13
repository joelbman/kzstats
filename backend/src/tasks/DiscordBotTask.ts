/* eslint-disable @typescript-eslint/no-explicit-any */

import Discord from 'discord.js'
import logger from 'util/Logger'
import { DISCORD_KEY } from '../util/Config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md = require('markdown-it')({ breaks: true })

interface NewsItem {
  message: string
  footer: string
  date: number
}

let newsList: NewsItem[] = []

const resolveUserMentions = async (message: string, client: Discord.Client): Promise<string> => {
  const matches = message.match(/<([^\d]*(\d+)[^\d]*)>/gm)

  if (!matches || matches.length < 1) return message

  const names = Promise.all(
    matches.map(async (match) => {
      const id = match.replace(/\D/g, '')

      try {
        const user = await client.users.fetch(id)
        return { id: match, name: user.username }
      } catch (e) {
        logger.error(e.message)
        return null
      }
    })
  )

  let msg = message
  const userObjects = await names

  userObjects.forEach((user) => {
    msg = msg.replace(user.id, `\`${user.name}\``)
  })

  return msg
}

const getNewsList = (client: Discord.Client): void => {
  const getList = async () => {
    const channel: any = await client.channels.fetch('329472618220486657')

    const messages = await channel.messages.fetch({ limit: 10 })

    newsList = await Promise.all(
      messages.map(async (m: Discord.Message) => {
        if (m.embeds.length === 0 || m.embeds[0].description.includes('[](__kzstats_ignore__)')) return

        const message = m.embeds[0].description

        const parsedMsg = await resolveUserMentions(message, client)

        return {
          message: md.render(parsedMsg.replace(/```/g, '\r\n```\r\n')),
          footer: m.embeds[0].footer.text,
          date: Date.parse(m.embeds[0].footer.text.split(' @ ')[1]),
        }
      })
    )

    // Clear out unidentified entries
    newsList = newsList.filter((obj) => {
      if (obj) return obj
    })

    newsList.sort((a: NewsItem, b: NewsItem) => {
      return b.date - a.date
    })

    console.log('Updated news list')
  }

  getList()
  setInterval(getList, 700000)
}

const DiscordBotTask = (): void => {
  if (!DISCORD_KEY) {
    logger.error('DISCORD API KEY NOT SET')
    return
  }

  const client = new Discord.Client()

  client.on('ready', () => {
    getNewsList(client)
    console.log(`Logged in as ${client.user.tag}!`)
  })

  client.login(DISCORD_KEY)
}

export { newsList }
export default DiscordBotTask
