import { Route, Routes } from 'react-router'
import Home from './Home'
import InfiniteScroll from './InfiniteScroll'
import Navbar from './Navbar'


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/infinite-scroll' element={<InfiniteScroll/>}/>
    </Routes>
     
    </>
  )
}

export default App
