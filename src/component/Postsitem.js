import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostsItem = ({ postId, category, title, description, authorId, thumbnail , createdAt}) => {
    const shortDesc = description.length > 145 ? description.substr(0, 145) + '......' : description;
    const postTitle = title?.length > 40 ? title.substr(0, 30) + '......' : title;

    return (
        <article className='post'>
            <div className='post-thumbnail'>
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
            </div>
            <div className='post-content'>
            <Link to={`/posts/${postId}`}>
            <h3>{postTitle}</h3>        
            </Link>
                <p dangerouslySetInnerHTML={{__html:shortDesc}}></p>
                <div className='post-footer'>
                    <PostAuthor authorId={authorId} createdAt={createdAt} />
                    <Link to={`/posts/categories/${category}`} className='btn btn-primary btn-category'>
                        {category}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PostsItem;
