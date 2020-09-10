import ErrorHandler from 'components/general/ErrorHandler'
import ImageC from 'components/general/ImageC'
import { FlagIcon } from 'components/icons'
import ChartIcon from 'components/icons/ChartIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import { difficultyToText, runtimeFormat } from 'components/util/filters'
import { ModeContext } from 'context/ModeContext'
import useApiRequest from 'hooks/useApiRequest'
import KZRecord from 'models/KZRecord'
import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
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
  const [wr, setWr] = useState<Record<string, KZRecord | null>>({
    pro: null,
    tp: null,
  })
  const { error, loader, data } = useApiRequest('/maps/', apiOpt.current)

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

  const setWrCallBack = (proWr: KZRecord | null, tpWr: KZRecord | null) => {
    setWr({ pro: proWr, tp: tpWr })
  }

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
              width="230"
              height="180"
              className="border-black border-2"
            />
          </Suspense>
        </div>
        <div className="flex-grow">
          <p className="text-3xl font-bold">{mapname}</p>
          {wr.pro && (
            <p className="mb-1">
              <div
                className="bg-red-800 text-white p-1 py-0 rounded border text-sm border-black mr-2 inline-block"
                style={{ lineHeight: '1.5rem', width: '3.29rem' }}
              >
                <TrophyIcon width="15" height="15" />
                PRO
              </div>
              <span className="text-lg">
                {runtimeFormat(wr.pro.time)}
              </span> by{' '}
              <Link to={`/players/${wr.pro.steamid64}`}>
                {wr.pro.player_name}
                {wr.pro.countrycode && <FlagIcon code={wr.pro.countrycode} />}
              </Link>
            </p>
          )}
          {wr.tp && (
            <p>
              <div
                className="bg-blue-700 text-white p-1 py-0 rounded border text-sm border-black mr-2 inline-block"
                style={{
                  lineHeight: '1.5rem',
                  width: '3.29rem',
                }}
              >
                <TrophyIcon width="15" height="15" />
                TP
              </div>
              <span className="text-lg">
                {runtimeFormat(wr.tp.time)}
              </span> by{' '}
              <Link to={`/players/${wr.tp.steamid64}`}>
                {wr.tp.player_name}
                {wr.tp.countrycode && <FlagIcon code={wr.tp.countrycode} />}
              </Link>
            </p>
          )}
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
            <MapRecords
              mapname={mapname}
              modeState={modeState}
              setWrCallBack={setWrCallBack}
            />
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
