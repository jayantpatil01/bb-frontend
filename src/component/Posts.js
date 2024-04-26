import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Postsitem from './Postsitem';
import Loader from '../component/Loader';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response?.data);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

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
            // console.log("Post ID:", id); // Log the post ID
            return (
              <Postsitem
                key={id}
                postId={id}
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

export default Posts;
