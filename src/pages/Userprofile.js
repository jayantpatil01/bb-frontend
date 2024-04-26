import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Userprofile = () => {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate(); // Moved inside the functional component
  const token = currentUser?.token;
  const [isAvatartouched, setIsAvatarTouched] = useState(false);
  const [avatar, setAvatar] = useState(null); // Changed initial state to null
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser?.id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(`${process.env.REACT_APP_ASSETS_URL}uploads/${avatar}`);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [currentUser?.id, token]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.append('avatar', avatar); // Append avatar file to FormData
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      setAvatar(`${process.env.REACT_APP_ASSETS_URL}uploads/${response?.data.avatar}`);
      alert("Avatar updated successfully!"); // Show alert
    } catch (err) {
      setError(err);
    }
  }
  

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);
      if (avatar) { // Only append avatar if it's not null
        userData.append('avatar', avatar);
      }
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        // Show alert after form is successfully edited
        alert("User Details edited successfully!");
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <section className='profile'>
      <div className='container profile-container'>
        <Link to={`/mypost/${currentUser.id}`} className='btn'>
          My posts
        </Link>
        <div className='profile-details'>
          <div className='avatar-wrapper'>
          <div className='profile-avatar'>
            {avatar && <img src={avatar} alt='' />}
          </div>


            <form className='avatar-form'>
               <input type='file' name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png,jpg,jpeg' />

              <label htmlFor='avatar' className='profile-avatar-btn' onClick={() => setIsAvatarTouched(true)}><FaEdit /></label>
            </form>
            {
              isAvatartouched && <button className='profile-avatar-btn' onClick={changeAvatarHandler}><FaCheck /></button>
            }
          </div>
          <h1>{currentUser?.name}</h1>
          <form className='form profile-form' onSubmit={updateUserDetails}>
            {
              error && <p className='form-error-message'>{error}</p>
            }
            <input type='text' placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Current password ' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type='password' placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type='password' placeholder=' ConfirmNew Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button className='btn btn-primary'>
              Update Details
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Userprofile;
