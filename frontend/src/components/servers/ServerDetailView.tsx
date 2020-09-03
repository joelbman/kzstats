import ImageC from 'components/general/ImageC'
import { LockIcon, ServerIcon, TrophyIcon } from 'components/icons'
import useApiRequest from 'hooks/useApiRequest'
import React, { Suspense, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import ServerDetailStatus from './ServerDetailStatus'

interface Props {
  match: { params: { id: string; selectedTab?: string } }
}

const ServerDetailView = (props: Props) => {
  const params = props.match.params.id

  const { error, loader, data } = useApiRequest(`/server/${params}`, null, true)
  const [activeTab, setActiveTab] = useState(0)

  if (error) return error
  if (loader) return loader

  return (
    <div className="flex flex-col">
      <Helmet title={data.server.name} />
      <div className="flex flex-row flex-wrap">
        <div className="mr-4 mb-4 md:mb-0">
          <Suspense
            fallback={
              <div className="w-48 h-32 bg-gray-medium border-2 border-black"></div>
            }
          >
            <ImageC
              src={`/img/map/thumb/tn_${data.query?.map}.jpg`}
              alt={data.query?.map}
              className="border-black border-2"
              width="200"
              height="160"
            />
          </Suspense>
        </div>
        <div className="block md:inline-block">
          <p className="text-2xl font-bold">
            {data.server.name} {data.query?.password && <LockIcon />}
          </p>
          <p className="text-lg">
            {data.server.ip}:{data.server.port}
          </p>
          {data.query?.map && (
            <p>
              Map: <Link to={`/maps/${data.query.map}`}>{data.query.map}</Link>
            </p>
          )}
          {data.query?.connect && (
            <a href={`steam://connect/${data.query.connect}`}>
              <button className="joinbutton mt-1">Connect</button>
            </a>
          )}
        </div>
      </div>
      <div className="flex-grow mt-8"></div>
      <Tabs
        selectedIndex={activeTab}
        selectedTabClassName="tab-selected"
        className="tab-main"
        onSelect={(i: number) => {
          setActiveTab(i)
        }}
        disabledTabClassName="tab-disabled"
      >
        <TabList>
          <Tab>
            <button>
              <ServerIcon />
              Status
            </button>
          </Tab>
          <Tab>
            <button>
              <TrophyIcon />
              Records
            </button>
          </Tab>
          <div className="tab-filler"></div>
        </TabList>
        <TabPanel>
          <ServerDetailStatus data={data.query} />
        </TabPanel>
        <TabPanel>
          <h1>Records</h1>
          Not supported by the Global API yet.
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ServerDetailView
