import React from 'react'
import NavBar from './components/NavBar'
import ContentWrapper from './components/ContentWrapper'
import Footer from './components/Footer'
import './tailwind.output.css'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div className="bg-gray-800">
      <BrowserRouter>
        <NavBar></NavBar>
        <ContentWrapper></ContentWrapper>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  )
}

export default App
