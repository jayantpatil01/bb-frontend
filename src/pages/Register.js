import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userdata, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserdata(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');

    // Check if all required fields are filled
    if (!userdata.name || !userdata.email || !userdata.password || !userdata.password2) {
      setError('Fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userdata);
      const newUser = response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      } else {
        // Show alert
        window.alert('User registered successfully. You can now log in.');

        // Redirect to login page after showing the alert
        navigate('/login');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Register</h2>
        <form className='form register-form' onSubmit={registerUser}>
          {error && <p className='form-error-message'>{error}</p>}
          <input type='text' placeholder='Full Name' name='name' value={userdata.name} onChange={changeInputHandler} />
          <input type='text' placeholder='Email' name='email' value={userdata.email} onChange={changeInputHandler} />
          <input type='password' placeholder='Password' name='password' value={userdata.password} onChange={changeInputHandler} />
          <input type='password' placeholder='Confirm Password' name='password2' value={userdata.password2} onChange={changeInputHandler} />
          <button type='submit' className='btn btn-primary'>Register</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign In</Link></small>
      </div>
    </section>
  );
}

export default Register;
