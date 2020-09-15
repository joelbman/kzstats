/* eslint-disable @typescript-eslint/no-explicit-any */

import Discord from 'discord.js'
import { DISCORD_KEY } from '../util/Config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md = require('markdown-it')({ breaks: true })

let newsList = []

// bots test 752625802377560136
// official 329472618220486657

const getNewsList = (client: Discord.Client): void => {
  const getList = () => {
    client.channels.fetch('329472618220486657').then((c: any) => {
      c.messages.fetch({ limit: 10 }).then((messages) => {
        newsList = []
        messages.forEach((m: Discord.Message) => {
          if (m.embeds.length === 0 || m.embeds[0].description.includes('[](__kzstats_ignore__)')) return
          newsList.push({
            message: md.render(m.embeds[0].description.replace(/```/g, '\r\n```\r\n')),
            footer: m.embeds[0].footer.text,
          })
        })
        console.log('Updated news list')
      })
    })
  }

  getList()
  setInterval(getList, 700000)
}

const DiscordBotTask = (): void => {
  const client = new Discord.Client()

  client.on('ready', () => {
    getNewsList(client)
    console.log(`Logged in as ${client.user.tag}!`)
  })

  client.login(DISCORD_KEY)
}

export { newsList }
export default DiscordBotTask
