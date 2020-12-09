const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')

router.put('/profile/:id', (req, res) => {
    const { id } = req.params
    const { detailsToUpdate } = req.body

    // Check if the incoming id is a valid ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    User.findByIdAndUpdate(id, detailsToUpdate, {new: true})
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    })
    


router.get('/profile/:id', (req, res) => {
    const { id } = req.params
    User.findOne({ _id: id })
        .then((profileDetails) => {
            console.log(profileDetails)
            res.status(200).json(profileDetails)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router