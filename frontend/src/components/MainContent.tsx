import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import AdminView from './admin/AdminView'
import BanListView from './bans/BanListView'
import ErrorHandler from './general/ErrorHandler'
import HomeView from './home/HomeView'
import JumpStatsView from './jumpstats/JumpStatsView'
import MapDetailView from './maps/detail/MapDetailView'
import MapListView from './maps/list/MapListView'
import PlayerDetailView from './players/detail/PlayerDetailView'
import PlayerListView from './players/list/PlayerListView'
import SearchView from './search/SearchView'
import ServerDetailView from './servers/ServerDetailView'
import ServerListView from './servers/ServerListView'

const MainContent = () => {
  return (
    <main className="flex justify-center w-full overflow-x-hidden mt-24 mb-20 px-2 xl:pl-32" style={{ minHeight: '85vh' }}>
      <div className="block px-2 w-full xl:w-4/5">
        <Helmet defaultTitle="KZStats" titleTemplate="%s - KZStats" />
        <Switch>
          <Route exact path="/" component={HomeView} />

          <Route exact path="/maps" component={MapListView} />
          <Route path="/maps/:mapname/:selectedTab?" component={MapDetailView} />

          <Route exact path="/players" component={PlayerListView} />
          <Route path="/players/:steamid64/:selectedTab?" component={PlayerDetailView} />

          <Route path="/jumpstats/:jumpType?" component={JumpStatsView} />
          <Route path="/bans/:steamid?" component={BanListView} />

          <Route exact path="/servers" component={ServerListView} />
          <Route exact path="/servers/:id" component={ServerDetailView} />

          <Route path="/search/:searchStr" component={SearchView} />

          <Route exact path="/admin" component={AdminView} />

          <Route>
            <ErrorHandler type={404} />
          </Route>
        </Switch>
      </div>
    </main>
  )
}

export default MainContent
