import Panel from 'components/general/Panel'
import SteamButton from 'components/general/SteamButton'
import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import LatestRecords from './LatestRecords'

const HomeView = () => {
  const userCtx = useContext(UserContext)

  const notLoggedIn = () => {
    return (
      <Panel
        header={() => {
          return <>My records</>
        }}
      >
        Log in with Steam to view your latest records.
        <SteamButton />
      </Panel>
    )
  }

  return (
    <>
      <h1>Latest</h1>
      <div className="flex flex-col lg:flex-row w-full">
        <Helmet title="Latest" />
        <div className="xl:w-1/3 mr-10">
          <LatestRecords />
        </div>
        <div className="xl:w-1/3">
          {userCtx?.user?.steamid64 ? (
            <LatestRecords myRecords={true} />
          ) : (
            notLoggedIn()
          )}
        </div>
      </div>
    </>
  )
}

export default HomeView
