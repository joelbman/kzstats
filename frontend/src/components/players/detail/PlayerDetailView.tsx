import ChartIcon from 'components/icons/ChartIcon'
import JumpIcon from 'components/icons/JumpIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Img } from 'react-image'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import useApiRequest from '../../util/useApiRequest'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerRecords from './PlayerRecords'

interface Player {
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
  name: string
}

interface Props {
  match: { params: { steamid64: string } }
}

const PlayerDetailView = (props: Props) => {
  const steamid64 = props.match.params.steamid64
  const [apiOptions] = useState({ steamid64_list: steamid64 })
  const { error, isLoaded, data } = useApiRequest('/players', apiOptions)
  const [player, setPlayer] = useState<Player | null>(null)

  useMemo(() => {
    setPlayer(data[0])
  }, [data])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  if (!player) return <h1>Error</h1>

  return (
    <div className="flex flex-col">
      <Helmet title={player.name} />
      <div className="flex flex-row">
        <div className="w-56">
          <Img
            src="/img/noimage.png"
            alt="img"
            width="200"
            height="200"
            className="border-black border-2"
          />
        </div>
        <div className="flex-grow">
          <p className="text-2xl font-bold">{player.name}</p>
          <p>Country: N/A</p>
          <p>{player.steam_id}</p>
          <p>
            <a href="#asd">Steam profile</a>
          </p>
        </div>
      </div>
      <div className="flex-grow mt-8">
        <Tabs className="tab-main">
          <TabList>
            <Tab>
              <TrophyIcon />
              Records
            </Tab>
            <Tab>
              <JumpIcon />
              Jumpstats
            </Tab>
            <Tab>
              <ChartIcon />
              Statistics
            </Tab>
            <Tab className="tab-filler"></Tab>
          </TabList>

          <TabPanel>
            <PlayerRecords steamid64={steamid64} />
          </TabPanel>
          <TabPanel>
            <PlayerJumpStats steamid64={steamid64} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default PlayerDetailView
