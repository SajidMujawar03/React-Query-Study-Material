import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './Home'
import UseMutation from './UseMutation'
import Navbar from './Navbar'

function App() {

  return (
    <>
    <Navbar/>
     <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/usemutation' element={<UseMutation/>}/>
     </Routes>
    </>
  )
}

export default App
