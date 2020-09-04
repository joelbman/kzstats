import axios, { AxiosResponse } from 'axios'
import Gamedig from 'gamedig'

const ServerService = {
  getServerInfo: async (
    identifier: string
  ): Promise<Record<string, unknown>> => {
    const split = identifier.split(':')
    let ip: string, port: number, server: Record<string, string>
    let query: Gamedig.QueryResult
    let apiRes: AxiosResponse

    if (split.length === 2 && parseInt(split[1])) {
      ip = split[0]
      port = parseInt(split[1])
      apiRes = await axios.get('https://kztimerglobal.com/api/v2/servers', {
        params: { ip: ip, port: port },
      })
      server = apiRes.data[0]
    } else if (parseInt(identifier)) {
      const apiRes = await axios.get(
        `https://kztimerglobal.com/api/v2/servers/${identifier}`
      )
      ip = apiRes.data.ip.replace(/(\r\n|\n|\r)/gm, '')
      port = apiRes.data.port
      server = apiRes.data
    }

    try {
      query = await Gamedig.query({
        type: 'csgo',
        host: ip,
        port: port,
      })
    } catch (e) {
      query = null
    }

    // Workaround for workshop map names
    if (query?.map)
      query.map = query.map.split('/')[query.map.split('/').length - 1]

    // Strip newlines off IPs because Global API seems to have them occasionally
    if (server?.ip) {
      server.ip = server.ip.replace(/(\r\n|\n|\r)/gm, '')
    }

    return { server: server, query: query }
  },
}

export default ServerService
