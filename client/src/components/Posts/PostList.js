import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PostService from '../../services/post.service';

const PostList = (props) => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [postToSave, setPostToSave] = useState({});
  const [commentToSave, setCommentToSave] = useState({});

  const getAllPosts = () => {
    const service = new PostService();

    service
      .getPosts()
      .then((responseFromApi) => {
        setListOfPosts(responseFromApi.data);
        setCommentToSave({});
      })
      .catch((error) => console.error(error));
  };

  const handlePostFormSubmit = (event) => {
    const service = new PostService();
    event.preventDefault();
    const { text } = postToSave;
    service
      .createPost({
        text: text,
        userId: props.loggedInUser._id,
        username: props.loggedInUser.username,
        type: props.loggedInUser.type,
      })
      .then(() => {
        getAllPosts();
        setPostToSave({ text: '' });
      })

      .catch((error) => console.error(error));
  };

  const handleCommentFormSubmit = (event) => {
    const service = new PostService();
    event.preventDefault();
    const { postId, comment } = commentToSave;

    service
      .updatePost({
        id: postId,
        comments: {
          text: comment,
          user: props.loggedInUser._id,
          username: props.loggedInUser.username,
        },
      })
      .then(() => {
        getAllPosts();
        setCommentToSave({ comment: '' });
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPostToSave({ [name]: value });
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCommentToSave({ comment: value, postId: name });
  };

  useEffect(getAllPosts, []);

  const deletePost = (event) => {
    event.preventDefault();
    const { name } = event.target;

    const service = new PostService();

    service
      .removePost(name)
      .then(() => {
        getAllPosts();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className='post-title'>
        <img src='/posts.png' alt='alternative' width={150} height={150} />
      </div>
      <div>
        <form onSubmit={handlePostFormSubmit}>
          <label>Add a post </label>
          <input
            type='text'
            value={postToSave.text}
            name='text'
            onChange={handleChange}
          />
        </form>
        <div className='post-button'>
          <Link to='/'>
            <button
              className='button is-primary'
              onClick={handlePostFormSubmit}
            >
              Submit
            </button>
          </Link>
        </div>
        <div className='post-list'>
          {listOfPosts.map((post) => {
            return (
              <div key={post._id}>
                <div
                  className={
                    post.type === 'volunteer'
                      ? 'volunteer-post'
                      : 'need-help-post'
                  }
                >
                  <div className='post-text'>
                    <h3>
                      <strong>Type:</strong>{' '}
                      {post.type === 'volunteer' ? 'Volunteer' : 'Help needed'}
                    </h3>
                  </div>
                  <div className='post-text'>
                    <p>
                      <strong>User: </strong>
                      <Link to={`/profile/${post.userId}`}>
                        {' '}
                        {post.username}
                      </Link>
                    </p>
                  </div>

                  <div className='post-text'>
                    <h3>
                      <strong>Post:</strong> {post.text}
                    </h3>
                  </div>

                  <div className='post-text'>
                    <h3>
                      <strong>Added:</strong> {post.date}
                    </h3>

                    {post.comments.map((comment) => {
                      return (
                        <div>
                          <div> Comment: {comment.text}</div>
                          Comment By:{' '}
                          <Link to={`/profile/${comment.user}`}>
                            {' '}
                            {comment.username}
                          </Link>
                          <div> Comment At: {comment.date}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='comment-box'>
                    <form onSubmit={handleCommentFormSubmit}>
                      <label>Leave A Comment</label>
                      <input
                        type='text'
                        value={commentToSave.comment}
                        name={post._id}
                        onChange={handleCommentChange}
                      />
                    </form>
                  </div>

                  <div className='comment-buttons'>
                    <div className='submit-comment'>
                      <Link to='/'>
                        <button
                          className='button is-primary is-inverted'
                          onClick={handleCommentFormSubmit}
                        >
                          Submit Comment
                        </button>
                      </Link>
                    </div>

                    <div className='delete-post'>
                      {post.userId === props.loggedInUser._id && (
                        <Link to='/posts'>
                          <button
                            className='button is-danger is-inverted'
                            name={post._id}
                            onClick={deletePost}
                          >
                            Delete post
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostList;
