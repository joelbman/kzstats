import ImageC from 'components/general/ImageC'
import {
  ChartIcon,
  FlagIcon,
  JumpIcon,
  SettingsIcon,
  TrophyIcon,
} from 'components/icons/'
import { ModeContext } from 'context/ModeContext'
import { UserContext } from 'context/UserContext'
import KZRecord from 'models/KZRecord'
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import useApiRequest from '../../../hooks/useApiRequest'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerProfileSettings from './PlayerProfileSettings'
import PlayerRecords from './PlayerRecords'
import PlayerStats from './PlayerStats'

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
  const steamid64 = props.match.params.steamid64

  // handle old kzstats links
  if (steamid64.substr(0, 2) === '11' || steamid64.substr(0, 2) === '10')
    window.location.href = `/api/player/old/${steamid64}`

  const userCtx = useContext(UserContext)
  const { state: modeState } = useContext(ModeContext)
  const user = userCtx?.user
  const { error, loader, data: profileData } = useApiRequest(
    `/player/${steamid64}/steam`,
    null,
    true
  )
  const [steamProfile, setSteamProfile] = useState<SteamProfile | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [points, setPoints] = useState(0)
  const [combinedRecords, setCombinedRecords] = useState([])

  const apiOptions = useRef({
    steamid64: steamid64,
    has_teleports: true,
    modes_list_string: modeState.kzMode,
    tickrate: modeState.tickrate,
    limit: 2000,
    stage: 0,
  })
  const {
    error: recordErr,
    loader: recordLoader,
    data: recordData,
  } = useApiRequest('records/top/', apiOptions.current)

  const tpopts = useRef({ ...apiOptions.current, has_teleports: false })
  const { error: tperr, loader: tploader, data: tpdata } = useApiRequest(
    'records/top/',
    tpopts.current
  )

  useMemo(() => {
    let pts = 0
    recordData.forEach((r: KZRecord) => {
      pts += r.points
    })
    tpdata.forEach((r: KZRecord) => {
      pts += r.points
    })
    setPoints(pts)
    setCombinedRecords(recordData.concat(tpdata))
  }, [recordData, tpdata])

  useMemo(() => {
    setSteamProfile(profileData)
  }, [profileData])

  useMemo(() => {
    apiOptions.current = {
      ...apiOptions.current,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    }
    tpopts.current = {
      ...tpopts.current,
      modes_list_string: modeState.kzMode,
      tickrate: modeState.tickrate,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeState.kzMode, modeState.tickrate])

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

  if (error || recordErr || tperr) return error || recordErr || tperr
  if (loader || recordLoader || tploader)
    return loader || recordLoader || tploader

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
        <FlagIcon className="ml-0" code={steamProfile.loccountrycode} />{' '}
        {steamProfile.country}
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
          <p className="text-3xl font-bold">{steamProfile.personaname}</p>
          <p className="text-xl font-bold">{points} Points</p>
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
                <button>
                  <SettingsIcon />
                  Settings
                </button>
              </Tab>
            )}
            <div className="tab-filler"></div>
          </TabList>

          <TabPanel>
            <PlayerRecords data={combinedRecords} />
          </TabPanel>
          <TabPanel>
            <PlayerJumpStats steamid={steamProfile.steamid32} />
          </TabPanel>
          <TabPanel>
            <PlayerStats data={combinedRecords} />
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
