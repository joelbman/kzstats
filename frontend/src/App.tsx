import React from 'react'
import NavBar from './components/NavBar'
import ContentWrapper from './components/ContentWrapper'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useBodyClass from './components/util/useBodyClass'
import './tailwind.output.css'

const App = () => {
  useBodyClass(['flex', 'flex-col', 'min-h-screen', 'bg-gray-700'])

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <BrowserRouter>
        <NavBar></NavBar>
        <ContentWrapper></ContentWrapper>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
