import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    event.preventDefault();
    const { postId, comment } = commentToSave;

    axios
      .put(`http://localhost:5000/api/posts`, {
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
      <h2>POST FEED</h2>
      <div>
        <form onSubmit={handlePostFormSubmit}>
          <label>Write a post </label>
          <input
            type='text'
            value={postToSave.text}
            name='text'
            onChange={handleChange}
          />
        </form>
        <Link to='/'>
          <button onClick={handlePostFormSubmit}>Post</button>
        </Link>
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
                <p>
                  Post By:{' '}
                  <Link to={`/profile/${post.userId}`}> {post.username}</Link>
                </p>

                <h3>Post: {post.text}</h3>
                <h3>
                  Posted by someone who is:{' '}
                  {post.type === 'volunteer'
                    ? 'a volunteer'
                    : 'looking for help'}
                </h3>
                <h3>Post At: {post.date}</h3>
                <div>
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
                <form onSubmit={handleCommentFormSubmit}>
                  <label>Leave A Comment</label>
                  <input
                    type='text'
                    value={commentToSave.comment}
                    name={post._id}
                    onChange={handleCommentChange}
                  />
                </form>
                <Link to='/'>
                  <button onClick={handleCommentFormSubmit}>
                    Submit Comment
                  </button>
                </Link>

                {post.userId === props.loggedInUser._id && (
                  <Link to='/posts'>
                    <button name={post._id} onClick={deletePost}>
                      Delete post
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
