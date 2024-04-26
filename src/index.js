import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/Layout';
import Errorpage  from './pages/Errorpage';
import Home from './pages/Home'
import Postdetails from './pages/Postdetail'
import Register from './pages/Register'
import Login from './pages/Login'
import Userprofile from './pages/Userprofile'
import Author from './pages/Author'
import Createpost from './pages/Createpost'
import Editpost from './pages/Editpost'
import Deletepost from './pages/Deletepost'
import Categorypost from './pages/Categorypost';
import Authorposts from './pages/Authorposts';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout'
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path:"/",
    element : <UserProvider><Layout/></UserProvider>,
    errorElement : <Errorpage />,
    children : [
      {index:true,element:<Home />},
      {path:"posts/:id",element:<Postdetails />},
      {path:"register",element:<Register />},
      {path:"Login",element:<Login />},
      {path:"profile/:id",element:<Userprofile />},
      {path:"authors",element:<Author />},
      {path:"create",element:<Createpost />},
      {path:"posts/categories/:category",element:<Categorypost />},
      {path:"posts/user/:id",element:<Authorposts />},
      {path:"mypost/:id",element:<Dashboard />},
      {path:"posts/:id/edit",element:<Editpost />},
      {path:"posts/:id/delete",element:<Deletepost />},
      {path:"Logout",element:<Logout />}
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

