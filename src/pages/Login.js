import React, { useState,useContext} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {userContext} from '../context/userContext.js'
const Login = () => {
  const[userdata,setUserdata]=useState({
    email:'',
    password:'',
  })


  const [error,SetError] = useState('');
  const navigate = useNavigate();


  const{setCurrentUser} =useContext(userContext)

  const ChangeInputHandler = (e) => {
    setUserdata(prevState => {
        return { ...prevState, [e.target.name]: e.target.value };
    });
}

const loginUser = async (e) => {
  e.preventDefault();
  SetError('');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userdata);
    console.log('Login response:', response);
    if (!response || !response.data) {
      // Handle unexpected response
      console.error('Unexpected response:', response);
      SetError("An unexpected error occurred. Please try again later.");
      return;
    }
    const user = response.data;
    // Handle successful login
    setCurrentUser(user);
    navigate('/');
  } catch (err) {
    console.error('Login error:', err);
    SetError(err.response?.data?.message || 'An error occurred.');
  }
}


  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign In</h2>
        <form className='form login-form' onSubmit={loginUser}>
            {error &&<p className='form-error-message'>
              {error}
            </p>}
          <input type='text' placeholder='email' name='email' value={userdata.email} onChange={ChangeInputHandler} autoFocus/>
          <input type='password' placeholder='password' name='password' value={userdata.password} onChange={ChangeInputHandler}/>
          <button type='submit' className='btn  btn-primary'>
                login
          </button>

        </form>
        <small>Not have an account? <Link to='../Register'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login