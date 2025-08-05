import React, { useState, useEffect } from 'react'
import '../stylesheet/WriteThread.css';
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

const WriteThread = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState()
  const [new_thread, setNew_thread] = useState()
  const [thread, setThread] = useState([])

 

  const handlePost = async () => {
    if (new_thread) {
      const response = await axios.post("http://localhost:8080/", { username: username, new_thread: new_thread })
      toast.success("posted")
      setThread([...thread, response.data])
      setNew_thread('');
    }
  }
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={() => handlePost(new_thread)}>
          <h2>Create a Thread</h2>
          <textarea
            value={new_thread}
            placeholder="Write your thread here..."
            className="thread-textarea"
          />
          <div className="modal-actions">
            <button type='submit' className="button">Post</button>
            <button onClick={onClose} className="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteThread;
