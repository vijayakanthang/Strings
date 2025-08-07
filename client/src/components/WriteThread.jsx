import React, { useState, useEffect } from 'react';
import '../stylesheet/WriteThread.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify'; // Add this if using react-toastify

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WriteThread = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [new_thread, setNew_thread] = useState('');
  const [thread, setThread] = useState([]);

  // Get username from token on load
  useEffect(() => {
    const token = localStorage.getItem('token'); // Or your key
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!new_thread.trim()) {
      toast.error("Thread cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/`, {
        username,
        new_thread,
      });
      toast.success("Posted");
      setThread([...thread, response.data]);
      setNew_thread('');
      onClose(); 
    } catch (error) {
      console.error("Error posting thread:", error);
      toast.error("Failed to post thread");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handlePost}>
          <h2>Create a Thread</h2>
          <textarea
            value={new_thread}
            onChange={(e) => setNew_thread(e.target.value)}
            placeholder="Write your thread here..."
            className="thread-textarea"
            rows={5}
          />
          <div className="modal-actions">
            <button type="submit" className="button">Post</button>
            <button type="button" onClick={onClose} className="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteThread;
