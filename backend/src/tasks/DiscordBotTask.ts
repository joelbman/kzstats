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

// bots test 752625802377560136
// official 329472618220486657

const getNewsList = (client: Discord.Client): void => {
  const getList = () => {
    client.channels.fetch('329472618220486657').then((c: any) => {
      c.messages.fetch({ limit: 10 }).then((messages) => {
        newsList = []

        Promise.all(
          messages.map((m: Discord.Message) => {
            if (m.embeds.length === 0 || m.embeds[0].description.includes('[](__kzstats_ignore__)')) return

            let message = m.embeds[0].description
            const match = message.search('<@')

            if (match > 0) {
              const sliced = message.slice(match)
              let id = '',
                mentionTag = ''
              for (let i = 0; i < 50; i++) {
                mentionTag += sliced[i]
                if (!isNaN(parseInt(sliced[i]))) id += sliced[i]
                if (sliced[i] === '>') break
              }

              client.users
                .fetch(id)
                .then((user) => {
                  message = message.replace(mentionTag, `\`${user.username}\``)
                  newsList.push({
                    message: md.render(message.replace(/```/g, '\r\n```\r\n')),
                    footer: m.embeds[0].footer.text,
                    date: Date.parse(m.embeds[0].footer.text.split(' @ ')[1]),
                  })
                })
                .catch((e) => {
                  logger.error(e.message)
                })
            } else {
              newsList.push({
                message: md.render(message.replace(/```/g, '\r\n```\r\n')),
                footer: m.embeds[0].footer.text,
                date: Date.parse(m.embeds[0].footer.text.split(' @ ')[1]),
              })
            }
          })
        ).then(() => {
          newsList.sort((a, b) => {
            return b.date - a.date
          })
          console.log('Updated news list')
        })
      })
    })
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
