import Axios from 'axios'
import ErrorHandler from 'components/general/ErrorHandler'
import ImageC from 'components/general/ImageC'
import ChartIcon from 'components/icons/ChartIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import { difficultyToText } from 'components/util/filters'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
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
import MapRecordHistory from './MapRecordHistory'
import MapRecords from './MapRecords'

interface Props {
  match: { params: { mapname: string; selectedTab?: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  const apiOpt = useRef({ name: mapname })
  const { state: modeState } = useContext(ModeContext)
  const [activeTab, setActiveTab] = useState(0)
  const [apiOptions, setApiOptions] = useState({
    mode: modeState.kzMode,
    tickrate: modeState.tickrate,
  })
  const { error, loader, data } = useApiRequest('/maps/', apiOpt.current)
  const { data: localData } = useApiRequest(
    '/record/' + mapname,
    apiOptions,
    true,
    false,
    'put'
  )

  useEffect(() => {
    switch (props.match.params.selectedTab) {
      case 'statistics':
        setActiveTab(1)
        break
      default:
        setActiveTab(0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loader) return loader
  if (error) return error

  if (data.length === 0) return <ErrorHandler type={404} />

  return (
    <div className="flex flex-col">
      <Helmet title={mapname} />
      <div className="flex flex-row flex-wrap">
        <div className="mr-4 mb-4 md:mb-0">
          <Suspense
            fallback={
              <div className="w-48 h-32 bg-gray-medium border-2 border-black"></div>
            }
          >
            <ImageC
              src={`/img/map/thumb/tn_${mapname}.jpg`}
              alt={mapname}
              width="200"
              height="160"
              className="border-black border-2"
            />
          </Suspense>
        </div>
        <div className="flex-grow">
          <p className="text-2xl font-bold">{mapname}</p>
          <p>Difficulty: {difficultyToText(data[0]?.difficulty)}</p>
        </div>
      </div>
      <div className="flex-grow mt-8">
        <Tabs
          selectedIndex={activeTab}
          selectedTabClassName="tab-selected"
          className="tab-main"
          onSelect={(i: number) => {
            setActiveTab(i)
          }}
        >
          <TabList>
            <Tab>
              <Link to={`/maps/${mapname}/`}>
                <button>
                  <TrophyIcon />
                  Records
                </button>
              </Link>
            </Tab>
            <Tab>
              <Link to={`/maps/${mapname}/statistics`}>
                <button>
                  <ChartIcon />
                  Statistics
                </button>
              </Link>
            </Tab>
            <div className="tab-filler"></div>
          </TabList>
          <TabPanel>
            <MapRecords mapname={mapname} modeState={modeState} />
          </TabPanel>
          <TabPanel>
            <MapRecordHistory mapname={mapname} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default MapDetailView
