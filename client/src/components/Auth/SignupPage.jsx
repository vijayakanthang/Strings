import axios from 'axios';
import React, { useState } from 'react';
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newpass, setNewpass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== newpass) {
      toast.error("Passwords do not match");
      return;
    }

    if (username !== '' && password !== '' && email !== '') {
      try {
        await axios.post("http://localhost:8080/signup", {
          username,
          email,
          password
        });
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data.error === 'Username already exists') {
          toast.error("Username already exists");
          setErrorMessage("Username already exists");
        } else {
          toast.error("Enter valid details");
          if (error.response) {
            setErrorMessage(`Error: ${error.response.data.error || error.response.statusText}`);
          } else if (error.request) {
            setErrorMessage("Network error: Please check your connection or server status.");
          } else {
            setErrorMessage(`Error: ${error.message}`);
          }
        }
        console.error("Signup error:", error);
      }
    } else {
      toast.error("Please fill in all fields");
    }
  }

  return (
    <div className='main bg'>
      <div className='login-card'>
        <form className='inputbox' onSubmit={handleSignup}>
          <div className='top'>Sign up</div>
          <div>
            <input 
              type='text' 
              autoComplete='username' 
              placeholder='Username' 
              className='field' 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <input 
              type='email' 
              placeholder='E-mail' 
              className='field' 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <input 
              type='password' 
              autoComplete='new-password' 
              placeholder='New password' 
              className='field' 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div>
            <input 
              type='password' 
              placeholder='Confirm password' 
              className='field' 
              onChange={(e) => setNewpass(e.target.value)} 
            />
          </div>
          <div>
            <button type='submit' className='button'>Sign up</button>
            <div className='signup'>
              Already have an account? <Link to="/login" className='link'>Login</Link>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default SignupPage;
