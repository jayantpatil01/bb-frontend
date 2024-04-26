import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorId}`);
        setAuthor(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getAuthor();
  }, [authorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Link to={`/posts/user/${authorId}`} className='post-author'>
      <div className='post-author-avatar'>
        {/* Add conditional check for author.avatar */}
        {author.avatar && <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`} alt='' />}
      </div>
      <div className='post-author-detail'>
        <h4>By: {author.name}</h4>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
      </div>
    </Link>
  );
};

export default PostAuthor;
