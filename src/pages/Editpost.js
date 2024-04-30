import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../context/userContext';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import loaderImg from '../images/loading.gif'; // Import loader image

const EditPost = () => {
  const { currentUser } = useContext(userContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

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

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      }
    }
    getPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader when update starts
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.append('thumbnail', thumbnail);

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setIsLoading(false); // Hide loader when update finishes (whether successful or not)
    }
  };

  return (
    <section className='create-post'>
      <div className='container'>
        <h2>Edit post</h2>
        {isLoading ? (
          <img src={loaderImg} alt="Loading..." />
        ) : (
          <>
            {error && <p className='form-error-message'>{error}</p>}
            <form className='form create-post-form' onSubmit={handleUpdate}>
              <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
              <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
                {postCategory.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} className='q1-editor' />

              <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpeg' />
              <button type='submit' className='btn btn-primary' disabled={isLoading}>
                {isLoading ? <img src={loaderImg} alt="Loading..." /> : 'Update post'} {/* Button text changes when loading */}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default EditPost;
