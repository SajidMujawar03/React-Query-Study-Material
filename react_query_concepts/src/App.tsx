import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import StaleTime from "./StaleTime"
import CacheTime from "./CacheTime"
import AutomaticSharing2 from "./AutomaticSharing2"
import AutomaticSharing1 from "./AutomaticSharing1"
import ManualFetching from "./ManualFetching"
import Polling from "./Polling"
import Navbar from "./Navbar"


function App() {


  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/stale-time" element={<StaleTime/>}/>
        <Route path='/cache-time' element={<CacheTime/>}/>
        <Route path="/automatic-sharing-1"element={<AutomaticSharing1/>}/>
        <Route path="/automatic-sharing-2" element={<AutomaticSharing2/>}/>
        <Route path="/manual-fetching" element={<ManualFetching/>}/>
        <Route path="/polling" element={<Polling/>}/>
      </Routes>
    </>
  )
}

export default App
