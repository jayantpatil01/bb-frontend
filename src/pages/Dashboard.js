import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/userContext';
import Loader from '../component/Loader';
import DeletePost from '../pages/Deletepost'

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams(); // Correctly use useParams as a function
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        navigate('/login');
        return; // Exit early if no token
      }

      setIsLoading(true); // Set loading state to true before fetching posts

      try {
        let response;
        if (id) {
          // If user ID is available, fetch posts for that user
          response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          // Otherwise, fetch all posts
          response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching posts
      }
    };

    fetchPosts();
  }, [token, navigate, id]); // Add token, navigate, and id to dependency array

  return (
    <section className='dashboard'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {posts.length ? (
            <div className='container dashboard-container'>
              {posts.map((post) => (
                <article key={post?.id} className='dashboard-post'>
                  <div className='dashboard-post-info'>
                    <div className='dashboard-post-thumbnail'>
                      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post?.thumbnail}`} alt='' />
                    </div>
                    <h5>{post.title}</h5>
                  </div>
                  <div className='dashboard-post-actions'>
                    <Link to={`/posts/${post?._id}`} className='btn'>
                      View
                    </Link>
                    <Link to={`/posts/${post?._id}/edit`} className='btn btn-primary'>
                      Edit
                    </Link>
                    <DeletePost postId={post?._id} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <h2>You Haven't Posted something yet</h2>
          )}
        </>
      )}
    </section>
  );
};

export default Dashboard;
