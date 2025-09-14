import { Route, Routes } from "react-router"
import Home from "./Home"
import MutateRequest from "./MutateRequest"
import Navbar from "./Navbar"



function App() {


  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/mutate-request" element={<MutateRequest/>}/>
    </Routes>
     
    </>
  )
}

export default App
