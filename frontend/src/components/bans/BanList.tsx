import React from 'react'
import axios from 'axios'

interface State {
  error: string
  isLoaded: boolean
  items: []
}
interface Props {}
class BanList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: '',
      isLoaded: false,
      items: [],
    }
  }

  componentDidMount() {
    axios
      .get('http://kztimerglobal.com/api/v2.0/bans', {
        params: {
          is_expired: false,
          limit: 100,
        },
      })
      .then((response) => {
        let data = response.data
        if (data.length > 0) {
          data.sort((a: any, b: any) => (a.updated_on > b.updated_on ? 1 : -1))
        }
        this.setState({ items: response.data, isLoaded: true })
      })
  }

  render() {
    const { error, isLoaded, items } = this.state
    if (error.length > 0) {
      return <div>Error: {error}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-900">Player</th>
              <th className="px-4 py-2 bg-gray-900">SteamID</th>
              <th className="px-4 py-2 bg-gray-900">Reason</th>
              <th className="px-4 py-2 bg-gray-900">Server</th>
              <th className="px-4 py-2 bg-gray-900">Date</th>
              <th className="px-4 py-2 bg-gray-900">Info</th>
            </tr>
          </thead>
          <tbody>
            {items.map(
              (ban: {
                player_name: string
                steam_id: string
                notes: string
                updated_on: string
              }) => (
                <tr className="">
                  <td>{ban.player_name}</td>
                  <td>{ban.steam_id}</td>
                  <td>{ban.notes}</td>
                  <td></td>
                  <td>{ban.updated_on}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )
    }
  }
}
export default BanList
