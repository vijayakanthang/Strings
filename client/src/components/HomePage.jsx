import React, { useState, useEffect } from 'react'
import '../stylesheet/HomePage.css'
import axios from 'axios'
import logo from '../assets/th.png'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { jwtDecode } from "jwt-decode"
import { toast, ToastContainer } from "react-toastify"
import like from "../assets/heartm.png"
import commentIcon from "../assets/comment.png";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

const HomePage = () => {
    const [username, setUsername] = useState()
    const [new_thread, setNew_thread] = useState()
    const [thread, setThread] = useState([])
    const navigate = useNavigate();
    const [commentInputs, setCommentInputs] = useState({});
    const [showComments, setShowComments] = useState({});
5

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
        const updatedThreads = thread.map((t) => {
            if (t._id === threadId) {
                const alreadyLiked = t.like.includes(username);
                const updatedLikes = alreadyLiked
                    ? t.like.filter(u => u !== username)
                    : [...t.like, username];
                return { ...t, like: updatedLikes };
            }
            return t;
        });
        setThread(updatedThreads);

        await axios.put(`${BASE_URL}/api/threads/${threadId}/like`, {
            username: username
        });
    } catch (error) {
        console.error('Error updating like:', error);
    }
};

const handleComment = async (threadId, commentText) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/threads/${threadId}/comment`, {
            username: username,
            comment: commentText
        });

        const updatedThreads = thread.map((t) => {
            if (t._id === threadId) {
                return { ...t, comment: [...t.comment, `${username}: ${commentText}`] };
            }
            return t;
        });

        setThread(updatedThreads);
    } catch (error) {
        console.error('Error commenting:', error);
    }
};
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
        <div className='actions'>
    <button onClick={() => handleLike(t._id)}>
  <img
    src={like}
    className={`like ${t.like.includes(username) ? 'liked' : ''}`}
    alt="like"
  />
  <span>{t.like.length}</span>
</button>


    <button onClick={() =>
        setShowComments(prev => ({ ...prev, [t._id]: !prev[t._id] }))
    }>
        <img src={commentIcon} className='comment-icon' />
    </button>
</div>

{showComments[t._id] && (
    <div className="comments-section">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleComment(t._id, commentInputs[t._id]);
                setCommentInputs({ ...commentInputs, [t._id]: "" });
            }}
            className="comment-form"
        >
            <input
                type="text"
                value={commentInputs[t._id] || ""}
                onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [t._id]: e.target.value })
                }
                className="comment-input"
                placeholder="Add a comment..."
            />
            <button type="submit" className="comment-btn">Comment</button>
        </form>

        <div className="existing-comments">
            {t.comment.map((c, i) => (
                <p key={i} className="comment">{c}</p>
            ))}
        </div>
    </div>
)}

    </div>
))}

                </div>
            </div>
        </>
    )
}

export default HomePage
