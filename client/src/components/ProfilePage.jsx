import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import '../stylesheet/ProfilePage.css';
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [myThreads, setMyThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        setName(decodedToken.username);

        const response = await axios.get(`${BASE_URL}/`, {
          headers: { Authorization: token }
        });

        setMyThreads(response.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month} ${day}, ${year} at ${hours}:${minutes}`;
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{name}</h2>
            <p className="post-count">{myThreads.filter(t => t.username === name).length} posts</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="profile-posts">
          {myThreads.filter(t => t.username === name).map((t) => (
            <div className='profile-card' key={t._id}>
              <div className="post-header">
                <h3>{t.username}</h3>
                <span className="post-date">{formatDateTime(t.date)}</span>
              </div>
              <p className="post-text">{t.new_thread}</p>
            </div>
          ))}

          {myThreads.filter(t => t.username === name).length === 0 && (
            <p className="no-posts">You haven't posted anything yet.</p>
          )}
        </div>

      </div>
    </>
  );
};

export default ProfilePage;
