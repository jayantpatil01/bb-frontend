import React, { useState, useEffect } from 'react';
import Postsitem from '../component/Postsitem';
import Loader from '../component/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Authorposts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Corrected

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
        setPosts(response?.data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [id]); // Added id as a dependency

  if (isLoading) {
    return <Loader />; 
  }

  if (error) {
    return <h2 className='center'>Error: {error}</h2>;
  }

  return (
    <section className='posts'>
      {posts.length > 0 ? (
        <div className='container post-container'>
          {posts.map(({ _id:id, thumbnail, title, category, description, creator ,createdAt }) => {
            console.log("Post ID:", id); // Log the post ID
            return (
              <Postsitem
                key={id}
                postsId={id}
                thumbnail={thumbnail}
                title={title}
                category={category}
                description={description}
                authorId={creator}
                createdAt={createdAt}
              />
            );
          })}
        </div>
      ) : (
        <h2 className='center'>No Post yet!</h2>
      )}
    </section>
  );
};

export default Authorposts;
