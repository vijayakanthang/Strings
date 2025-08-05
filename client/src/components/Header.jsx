import React, { useState } from 'react';
import '../stylesheet/Header.css';
import home from '../assets/home.png';
import search from '../assets/searchm.png';
import heart from '../assets/heartm.png';
import profile from '../assets/profilem.png';
import edit from '../assets/editm.png';
import logo from '../assets/th.png';
import menu from '../assets/menu.png';
import { Outlet, Link, useNavigate } from "react-router-dom";
import WriteThread from './WriteThread';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThreadModalOpen, setIsThreadModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (action) => {
    if (action === 'logout') {
      handleLogout();
    }
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const openThreadModal = () => {
    setIsThreadModalOpen(true);
  };

  const closeThreadModal = () => {
    setIsThreadModalOpen(false);
  };

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <div className='navl'>
          <Link to='/'><img src={logo} alt="Logo" className='img' /></Link>
        </div>
        <div className='navm'>
          <Link to='/home'><img src={home} className='img' alt="Home" /></Link>
          <Link to='/search'><img src={search} className='img' alt="Search" /></Link>
          <Link onClick={openThreadModal}><img src={edit} className='img' alt="Write Thread" /></Link>
          <Link to='/fav'><img src={heart} className='img' alt="Favorites" /></Link>
          <Link to='/profile'><img src={profile} className='img' alt="Profile" /></Link>
        </div>
        <div className='navr'>
          <div className="custom-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              <img src={menu} alt="Menu" className='img' />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu show">
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item" onClick={() => handleMenuClick('logout')}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <WriteThread isOpen={isThreadModalOpen} onClose={closeThreadModal} />
      <Outlet />
    </div>
  );
};

export default Header;
