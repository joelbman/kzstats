import ImageC from 'components/general/ImageC'
import {
  ChartIcon,
  FlagIcon,
  JumpIcon,
  SettingsIcon,
  TrophyIcon,
} from 'components/icons/'
import { UserContext } from 'context/UserContext'
import React, { Suspense, useContext, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import useApiRequest from '../../util/useApiRequest'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerProfileSettings from './PlayerProfileSettings'
import PlayerRecords from './PlayerRecords'
import PlayerStats from './PlayerStats'

interface Player {
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
  name: string
}

interface SteamProfile {
  avatar: string
  avatarfull: string
  avatarhash: string
  avatarmedium: string
  communityvisibilitystate: number
  lastlogoff: number
  loccountrycode: string
  personaname: string
  personastate: number
  personastateflags: number
  primaryclanid: string
  profilestate: number
  profileurl: string
  steamid: string
  timecreated: number
  country?: string
}

interface Props {
  match: { params: { steamid64: string } }
}

const PlayerDetailView = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const steamid64 = props.match.params.steamid64
  const { error, isLoaded, data } = useApiRequest(
    `/player/${steamid64}/steam`,
    null,
    true
  )
  const [steamProfile, setSteamProfile] = useState<SteamProfile | null>(null)

  useMemo(() => {
    setSteamProfile(data)
  }, [data])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>
  if (!steamProfile)
    return (
      <div>
        <h1>Error</h1>
        Error retrieving Steam profile
      </div>
    )

  const renderCountry = () => {
    if (!steamProfile.country) return <p>Country: N/A</p>
    return (
      <p>
        <FlagIcon code={steamProfile.loccountrycode} /> {steamProfile.country}
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      <Helmet title={steamProfile.personaname} />
      <div className="flex flex-row">
        <div className="w-36 mr-4">
          <a
            href={steamProfile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Suspense fallback={<div></div>}>
              <ImageC
                url={steamProfile.avatarfull}
                alt="Steam"
                width="140"
                height="140"
                className="border-black border-2"
              />
            </Suspense>
          </a>
        </div>
        <div className="flex-grow">
          <p className="text-2xl font-bold">{steamProfile.personaname}</p>
          {renderCountry()}
          <p>
            <a
              href={steamProfile.profileurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Steam profile
            </a>
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
            {user?.steamid64 === steamid64 && (
              <Tab>
                <SettingsIcon />
                Settings
              </Tab>
            )}
            <div className="tab-filler"></div>
          </TabList>

          <TabPanel>
            <PlayerRecords steamid64={steamid64} />
          </TabPanel>
          <TabPanel>
            <PlayerJumpStats steamid64={steamid64} />
          </TabPanel>
          <TabPanel>
            <PlayerStats steamid64={steamid64} />
          </TabPanel>
          {user?.steamid64 === steamid64 && (
            <TabPanel>
              <PlayerProfileSettings user={user} />
            </TabPanel>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default PlayerDetailView
