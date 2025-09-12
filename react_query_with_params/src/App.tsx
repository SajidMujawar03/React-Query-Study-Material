import { useState } from 'react'

import { Route, Routes } from 'react-router'
import Home from './Home'
import Posts from './Products'
import Post from './Product'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <Routes>
      
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/post/:id' element={<Post/>}/>

     </Routes>
    </>
  )
}

export default App
