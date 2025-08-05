import React, { useState, createContext, useContext, useEffect, useMemo, } from 'react'
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from './AuthContext';
import{toast} from 'react-toastify'
import "./LoginPage.css"



const LoginPage = () => {

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setusernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
     

        if (!username) {
            setusernameError("Please enter your username");
           
            return;
        }

        if (!password) {
            setPasswordError("Please enter your password");
            toast.error('Invalid password')
            return;
        }

        axios.post("http://localhost:8080/login",{username,password})
        .then((response) => {
            if (response.status === 200) {
              // console.log("token", response.data.token)
              localStorage.setItem("token", response.data.token);
              toast.success('Logged In')
              navigate("/home");
              
            }
          })
          .catch ((error) =>{
            if (error.response) {
              // Server responded with a status other than 200 range
              setErrorMessage(`Error: ${error.response.data.error || error.response.statusText}`);
              toast.error('Invalid username or password')
            } else if (error.request) {
              // Request was made but no response received
              setErrorMessage("Network error: Please check your connection or server status.");
            } else {
              // Something else happened
              setErrorMessage(`Error: ${error.message}`);
            }
            console.error("Signup error:", error);
            localStorage.removeItem("token");
          } );
    
    
        
    }

    return (

        <div className='main bg'>
            <div className='login-card'>
                <form className='inputbox' onSubmit={handleLogin}>
                    <div className='top'>Login</div>
                    <div><input type='text' autoComplete='username' placeholder='Username' className='field' onChange={(e) => setusername(e.target.value)} /></div>
                    <div ><input type='password' autoComplete='password' placeholder='Password' className='field' onChange={(e) => setPassword(e.target.value)} /></div>
                    <div><button type='submit' className='button' >Login</button>
                    <div className='signup'>Don't have an account <Link to='/signup' className='link'> Signup</Link></div>
                    </div>

                </form>

            </div>
        </div>

    )
}

export default LoginPage
