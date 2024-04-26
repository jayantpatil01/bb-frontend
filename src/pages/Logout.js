import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Logout = () => {
  const { setCurrentUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    alert("Logged Out Successfully"); // Corrected spelling
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 1000); // Delayed navigation to give time for the alert to be seen
    return () => clearTimeout(timeout); // Cleanup function
  }, [setCurrentUser, navigate]); // Dependencies for useEffect

  return null;
};

export default Logout;
