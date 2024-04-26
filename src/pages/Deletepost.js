import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../component/Loader';

const Deletepost = ({ postId }) => {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    // Show alert
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) {
      return; // Exit if user cancels deletion
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className='btn btn-sm btn-danger' onClick={removePost} disabled={isLoading}>
      {isLoading ? <Loader /> : 'Delete'}
    </button>
  );
};

export default Deletepost;
