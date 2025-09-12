import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Create from './pages/Create'
import Edit from './pages/Edit'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landingpage/>} />
          <Route path='/feed' element={<Home/>} />
          <Route path='/profile/:username' element={<Profile/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/edit' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
