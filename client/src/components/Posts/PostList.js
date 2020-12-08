import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PostList = (props) => {
    const [listOfPosts, setListOfPosts] = useState([])
    const [postToSave, setPostToSave] = useState({})
    const [commentToSave, setCommentToSave] = useState({})

    const getAllPosts = () => {
        axios
            .get(`http://localhost:5000/api/posts`)
            .then((responseFromApi) => {
                setListOfPosts(responseFromApi.data)
                setCommentToSave({})
            })
            .catch((error) => console.error(error))
    }

    const handlePostFormSubmit = (event) => {
        event.preventDefault()
        const { text } = postToSave
        axios
            .post(`http://localhost:5000/api/posts`, { text: text, userId: props.loggedInUser._id, username: props.loggedInUser.username, type: props.loggedInUser.type })
            .then(() => {
                getAllPosts()
                setPostToSave({ text: '' })
            })

            .catch((error) => console.error(error))
    }

    const handleCommentFormSubmit = (event) => {
        event.preventDefault()
        const { postId, comment } = commentToSave

        axios
            .put(`http://localhost:5000/api/posts`, { id: postId, comments: { text: comment, user: props.loggedInUser._id, username: props.loggedInUser.username } })
            .then(() => {
                getAllPosts()
                setCommentToSave({ comment: '' })
            })
            .catch((error) => console.error(error))
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setPostToSave({ [name]: value })
    }

    const handleCommentChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setCommentToSave({ comment: value, postId: name })
    }

    useEffect(getAllPosts, [])

    return (
        <div>
            <div>
                <form onSubmit={handlePostFormSubmit}>
                    <label>Write a post </label>
                    <input type="text" value={postToSave.text} name="text" onChange={handleChange} />
                </form>
                <Link to="/">
                    <button onClick={handlePostFormSubmit}>Post</button>
                </Link>
                <h2>Posts from the Backend</h2>
                {listOfPosts.map((post) => {
                    return (
                        <div key={post._id}>
                            <div className={post.type === 'volunteer' ? 'class for volunteer' : 'class for helper'}>
                                <p>
                                    Post By: <Link to={`/profile/${post.userId}`}> {post.username}</Link>
                                </p>

                                <h3>Post: {post.text}</h3>
                                <h3>Posted by someone who is: {post.type === 'volunteer' ? 'a volunteer' : 'looking for help'}</h3>
                                <h3>Post At: {post.date}</h3>
                                <div>
                                    {post.comments.map((comment) => {
                                        return (
                                            <div>
                                                <div> Comment: {comment.text}</div>
                                                Comment By: <Link to={`/profile/${comment.user}`}> {comment.username}</Link>
                                                <div> Comment At: {comment.date}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <form onSubmit={handleCommentFormSubmit}>
                                    <label>Leave A Comment</label>
                                    <input type="text" value={commentToSave.comment} name={post._id} onChange={handleCommentChange} />
                                </form>
                                <Link to="/">
                                    <button onClick={handleCommentFormSubmit}>Submit Comment</button>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="button **is-large is-success is-rounded**">Click here</button>
        </div>
    )
}

export default PostList