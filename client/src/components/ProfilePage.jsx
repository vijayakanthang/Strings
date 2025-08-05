import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import '../stylesheet/ProfilePage.css'
import {jwtDecode} from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const ProfilePage = () => {
  const [name,setName] =useState('')
  const [mythread,setMythread]= useState([])

  const navigate= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            if(!token){
                navigate("/login"); 
                return;
            }
            const response = await axios.get(`${BASE_URL}/`)
            setMythread(response.data)

            const decodedtoekn = jwtDecode(token)
            const name = decodedtoekn.username;
            setName(name);
           
        }
        catch (error) {
            console.error(error)
            navigate("/login"); 
            
        }

    }
    fetchData()
}, [])

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <h2>{name}</h2>
        </div>
        <div>
        
        {mythread.filter(j=> name == j.username).map((t) => (
                    <div className='card' key={t._id}>
                        <h3>{t.username}</h3>
                        <span>{t.date}</span>
                        <p>{t.new_thread}</p>

                    </div>
                ))}

          
        </div>
      </div>
    </>
  )
}

export default ProfilePage
