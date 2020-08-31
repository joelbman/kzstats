import ImageC from 'components/general/ImageC'
import {
  ChartIcon,
  FlagIcon,
  JumpIcon,
  SettingsIcon,
  TrophyIcon,
} from 'components/icons/'
import { UserContext } from 'context/UserContext'
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
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
  steamid32: string
  timecreated: number
  country?: string
}

interface Props {
  match: { params: { steamid64: string; selectedTab?: string } }
}

const PlayerDetailView = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const steamid64 = props.match.params.steamid64
  const { error, loader, data } = useApiRequest(
    `/player/${steamid64}/steam`,
    null,
    true
  )
  const [steamProfile, setSteamProfile] = useState<SteamProfile | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  useMemo(() => {
    setSteamProfile(data)
  }, [data])

  useEffect(() => {
    switch (props.match.params.selectedTab) {
      case 'jumpstats':
        setActiveTab(1)
        break
      case 'statistics':
        setActiveTab(2)
        break
      default:
        setActiveTab(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) return error
  if (loader) return loader

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
  const handleTabSelect = (index: number) => {
    setActiveTab(index)
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
                src={steamProfile.avatarfull}
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
        <Tabs
          selectedIndex={activeTab}
          onSelect={handleTabSelect}
          selectedTabClassName="tab-selected"
          className="tab-main"
        >
          <TabList>
            <Tab>
              <Link to={`/players/${steamid64}/`}>
                <button>
                  <TrophyIcon />
                  Records
                </button>
              </Link>
            </Tab>
            <Tab>
              <Link to={`/players/${steamid64}/jumpstats`}>
                <button>
                  <JumpIcon />
                  Jumpstats
                </button>
              </Link>
            </Tab>
            <Tab>
              <Link to={`/players/${steamid64}/statistics`}>
                <button>
                  <ChartIcon />
                  Statistics
                </button>
              </Link>
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
            <PlayerJumpStats steamid={steamProfile.steamid32} />
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
