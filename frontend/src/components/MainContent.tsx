import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import BanListView from './bans/BanListView'
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
    <main
      className="flex-grow w-full overflow-x-hidden pl-5 mt-24 mb-20 pr-8 xl:pl-16 xl:pr-16"
      style={{ minHeight: '85vh' }}
    >
      <Helmet defaultTitle="KZStats" titleTemplate="%s - KZStats" />
      <Switch>
        <Route exact path="/" component={HomeView} />

        <Route exact path="/maps" component={MapListView} />
        <Route path="/maps/:mapname" component={MapDetailView} />

        <Route exact path="/players" component={PlayerListView} />
        <Route path="/players/:steamid64" component={PlayerDetailView} />

        <Route exact path="/jumpstats" component={JumpStatsView} />
        <Route exact path="/bans" component={BanListView} />

        <Route exact path="/servers" component={ServerListView} />
        <Route exact path="/servers/:id" component={ServerDetailView} />

        <Route path="/search/:searchStr" component={SearchView} />
      </Switch>
    </main>
  )
}

export default MainContent