import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Maps from './maps/Maps'
import Players from './players/Players'
import BanList from './bans/BanList'
import Home from './Home'
import JumpStats from './jumpstats/JumpStats'

const ContentWrapper = () => {
  return (
    <main className="flex-1 h-full p-5 text-white ml-10">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/maps" component={Maps} />
        <Route exact path="/players" component={Players} />
        <Route exact path="/jumpstats" component={JumpStats} />
        <Route exact path="/bans" component={BanList} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </main>
  )
}

export default ContentWrapper
