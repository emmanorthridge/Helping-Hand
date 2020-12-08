const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')

const Post = require('../models/post.model')
// const User = require ("../models/user.model");

router.post('/posts', (req, res) => {
    const { text, userId, username, type } = req.body

    Post.create({
        text,
        userId,
        username,
        type,
    })
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get('/posts', (req, res) => {
    Post.find()
        .then((allThePosts) => {
            res.status(200).json(allThePosts)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.put('/posts', async function (req, res) {
    const { id, comments } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    // it would be better to write this using a promise (.then.catch), since that's what is everywhere else in the code, but idk if it's a big deal
    const post = await Post.find({ _id: id })

    const commentsToSave = post[0].comments || []
    commentsToSave.push(comments)

    const postToSave = { ...post, commentsToSave }

    Post.findByIdAndUpdate(id, postToSave[0])
        .then(() => {
            res.status(200).json({
                message: `User with ${id} is updated successfully.`,
            })
            console.log('user updated')
        })
        .catch((error) => {
            res.status(500).json(error)
        })
})

module.exports = router