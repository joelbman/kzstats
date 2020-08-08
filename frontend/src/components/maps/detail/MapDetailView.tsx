import React from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import MapRecordHistory from './MapRecordHistory'
import MapRecords from './MapRecords'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div>
      <Tabs
        selectedTabClassName="font-bold text-white border-b-2 border-black bg-blue-900"
        className="border-2 border-black"
      >
        <TabList className="bg-gray-900 h-12 list-none align-middle border-b-2 border-black table table-fixed w-full">
          <Tab className="table-cell h-full pl-4 pr-4 w-1/6 hover:bg-blue-800 hover:cursor-pointer hover:font-bold align-middle border-r-2 border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 458.18 458.18"
              className="texticon"
            >
              <path d="M36.09 5.948c-18.803 0-34.052 15.248-34.052 34.051 0 18.803 15.249 34.052 34.052 34.052 18.803 0 34.052-15.25 34.052-34.052 0-18.803-15.249-34.051-34.052-34.051zM147.537 80h268.604c22.092 0 40-17.908 40-40s-17.908-40-40-40H147.537c-22.092 0-40 17.908-40 40s17.908 40 40 40zM36.09 132.008c-18.803 0-34.052 15.248-34.052 34.051s15.249 34.052 34.052 34.052c18.803 0 34.052-15.249 34.052-34.052s-15.249-34.051-34.052-34.051zM416.142 126.06H147.537c-22.092 0-40 17.908-40 40s17.908 40 40 40h268.604c22.092 0 40-17.908 40-40s-17.908-40-39.999-40zM36.09 258.068c-18.803 0-34.052 15.248-34.052 34.051 0 18.803 15.249 34.052 34.052 34.052 18.803 0 34.052-15.249 34.052-34.052 0-18.803-15.249-34.051-34.052-34.051zM416.142 252.119H147.537c-22.092 0-40 17.908-40 40s17.908 40 40 40h268.604c22.092 0 40-17.908 40-40s-17.908-40-39.999-40zM36.09 384.128c-18.803 0-34.052 15.248-34.052 34.051s15.249 34.053 34.052 34.053c18.803 0 34.052-15.25 34.052-34.053s-15.249-34.051-34.052-34.051zM416.142 378.18H147.537c-22.092 0-40 17.908-40 40s17.908 40 40 40h268.604c22.092 0 40-17.908 40-40s-17.908-40-39.999-40z" />
            </svg>
            Records
          </Tab>
          <Tab className="table-cell h-full pl-4 pr-4 w-1/6 hover:bg-blue-800 hover:cursor-pointer hover:font-bold align-middle border-r-2 border-black">
            <img
              src="/img/icon/trophy.svg"
              alt="W"
              className="h-4 w-4 inline mr-2"
            />
            WR History
          </Tab>
          <Tab disabled={true} className="table-cell h-full pl-4 pr-4"></Tab>
        </TabList>
        <TabPanel className="bg-gray-800 p-4">
          <MapRecords mapname={mapname} />
        </TabPanel>
        <TabPanel className="bg-gray-800 p-4">
          <MapRecordHistory mapname={mapname} />
        </TabPanel>
      </Tabs>
      <Helmet title={mapname} />
    </div>
  )
}

export default MapDetailView
