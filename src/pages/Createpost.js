import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import loaderImg from '../images/loading.gif'; // Import loader image

const CreatePost = () => {
  const { currentUser } = useContext(userContext);
  const navigate = useNavigate(); // Moved inside the functional component

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]); // Added navigate and token as dependencies

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Initially set to false

  const postCategory = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investments", "Weather", "Uncategorized"];
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const createPost = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader when post creation starts
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', desc);
    postData.append('thumbnail', thumbnail); // Use append instead of set for file upload

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false); // Hide loader when post creation finishes (whether successful or not)
    }
  };

  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Create post</h2>
        {isLoading ? (
          <img src={loaderImg} alt="Loading..." />
        ) : (
          <>
            {error &&
              <p className='form-error-message'>{error}</p>
            }

            <form className='form create-post-form' onSubmit={createPost}>
              <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
              <select name='category' value={category} onChange={e => setCategory(e.target.value)} autoFocus>
                {postCategory.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <ReactQuill modules={modules} formats={formats} value={desc} onChange={setDesc} className='q1-editor' />
              <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpeg' /> {/* Adjusted accept attribute */}
              <button type='submit' className='btn btn-primary'> {/* Added type attribute */}
                Create post
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default CreatePost;
