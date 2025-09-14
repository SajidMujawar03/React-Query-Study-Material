import { useState } from 'react'
import Home from "@/pages/Home"
import OptimisticUpdates from "@/pages/OptimisticUpdates"
import { Route, Routes } from 'react-router'
import Navbar from './pages/Navbar'

function App() {
 

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/optimistic-updates' element={<OptimisticUpdates/>}/>
      </Routes>
    </>
  )
}

export default App
