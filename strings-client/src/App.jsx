import { useState } from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProfilePage from './components/ProfilePage'
import WriteThread from './components/WriteThread'
import Favourite from './components/Favourite'
import LoginPage from './components/Auth/LoginPage'
import SignupPage from './components/Auth/SignupPage'
import PrivateRoute from './components/Auth/PrivateRouter'
import Search from './components/Search'

function App() {


  return (
    <>
      <div className='all'>
        <BrowserRouter>
          <Routes className="home">
            <Route path='/home' element ={<HomePage/>}></Route>
            <Route path='/' element ={<HomePage/>}></Route>
            {/* <Route path='/home' element={<PrivateRoute element={HomePage}/>} ></Route> */}
            <Route path='/Profile' element={<ProfilePage />} ></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/fav' element={<Favourite />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>
            
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
