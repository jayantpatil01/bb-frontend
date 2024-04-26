import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../component/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import DeletePost from './Deletepost';
import { userContext } from '../context/userContext';
import axios from 'axios';

const Postdetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPosts(response.data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='post-details'>
      {error && <p className='error'>{error.message}</p>}
      {posts && (
        <div className='container post-details-container'>
          <div className='post-details-header'>
            {/* Pass authorId and createdAt props to PostAuthor */}
            <PostAuthor authorId={posts.creator} createdAt={posts.createdAt} />
            {currentUser?.id === posts?.creator && (
              <div className='post-details-button'>
                <Link to={`/posts/${posts?._id}/edit`} className='btn btn-primary btn-sm'>
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{posts.title}</h1>
          <div className='post-details-thumbnail'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${posts.thumbnail}`} alt={posts.title} />
          </div>
          <p dangerouslySetInnerHTML={{__html: posts.description}}></p> {/* Fix here */}
        </div>
      )}
    </section>
  );
};

export default Postdetail;
