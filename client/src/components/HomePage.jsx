import React, { useState, useEffect } from 'react'
import '../stylesheet/HomePage.css'
import axios from 'axios'
import logo from '../assets/th.png'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { jwtDecode } from "jwt-decode"
import { toast, ToastContainer } from "react-toastify"
import like from "../assets/heartm.png"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

const HomePage = () => {
    const [username, setUsername] = useState()
    const [new_thread, setNew_thread] = useState()
    const [thread, setThread] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`${BASE_URL}/home/`, {
                    headers: { Authorization: `${token}` }
                })
                setThread(response.data)

                const decodedToken = jwtDecode(token)
                setUsername(decodedToken.username)

            } catch (error) {
                console.error(error)
                navigate("/login")
            }
        }

        fetchData()
    }, [])

    // POST--- SubmitButton
    const handleSubmit = async () => {
        if (new_thread) {
            const response = await axios.post(`${BASE_URL}/`, {
                username: username,
                new_thread: new_thread
            })
            toast.success("Posted")
            setThread([...thread, response.data])
            setNew_thread('')
        }
    }

    // Like
    const handleLike = async (threadId) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/threads/${threadId}`, {
                like: [username]
            })
            console.log(response.data)
        } catch (error) {
            console.error('Error liking the thread:', error)
        }
    }

    return (
        <>
            <Header />
            <div className='tot'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }} className='input'>
                    <img src={logo} className='imgip' />
                    <input
                        type='text'
                        value={new_thread}
                        placeholder='Start a thread...'
                        className='inputfield'
                        onChange={(e) => setNew_thread(e.target.value)}
                    />
                    <button className='postbtn' type='submit'>POST</button>
                </form>

                <div className='feed'>
                    {thread.map((t, index) => (
                        <div className='card' key={t._id}>
                            <h3>{t.username}</h3>
                            <span>{t.date}</span>
                            <p>{t.new_thread}</p>
                            <button onClick={() => handleLike(t._id)}>
                                <img src={like} className='like' />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage
