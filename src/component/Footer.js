import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext'; // Import the user context

const Footer = () => {
  const { currentUser } = useContext(userContext); // Get the current user from context

  // Conditionally render the footer based on the user login status
  if (!currentUser) {
    return null; // Don't render the footer if the user is not logged in
  }

  // Render the footer content if the user is logged in
  return (
    <footer>
      <ul className='footer-categories'>
        <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Education">Education</Link></li>
        <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Investment">Investment</Link></li>
        <li><Link to="/posts/categories/Weather">Weather</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul>
      <div className='footer-copyright'>
        <small>All Right Reserved &copy; Copyright, BharatBlogs 2024.</small>
      </div>
    </footer>
  );
}

export default Footer;
