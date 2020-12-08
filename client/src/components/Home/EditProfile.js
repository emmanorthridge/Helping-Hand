import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EditProfile = (props) => {
    const { _id } = props.loggedInUser
    const [profileDetails, setProfileDetails] = useState({})
    const [detailsToUpdate, setDetailsToUpdate] = useState({})
    const getProfile = () => {
        axios
            .get(`http://localhost:5000/api/profile/${_id}`)
            .then((responseFromApi) => {
                setProfileDetails(responseFromApi.data)
                setDetailsToUpdate(responseFromApi.data)
            })
            .catch((error) => console.error(error))
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        axios
            .put(`http://localhost:5000/api/profile/${_id}`, { detailsToUpdate })
            .then(() => {
                props.history.push(`/profile/${_id}`)
            })
            .catch((error) => console.error(error))
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setDetailsToUpdate({ ...detailsToUpdate, [name]: value })
    }

    useEffect(getProfile, [])

    return (
        <div>
            <div>
                <div>Username: {profileDetails.username}</div>
                <div>Email: {profileDetails.email}</div>
            </div>

            <form onSubmit={handleFormSubmit}>
                <label>Description:</label>
                <input value={detailsToUpdate.description} type="text" name="description" onChange={handleChange} />
                <label>Location:</label>
                <input value={detailsToUpdate.location} type="text" name="location" onChange={handleChange} />

                <label>I am:</label>
                <select name="type" onChange={handleChange}>
                    <option selected={profileDetails.type === 'volunteer'} value="volunteer">
                        Volunteer
                    </option>
                    <option selected={profileDetails.type === 'non-volunteer'} value="non-volunteer">
                        Find Help
                    </option>
                </select>
            </form>

            <Link to="/">
                <button onClick={handleFormSubmit}>Update Profile</button>
            </Link>
        </div>
    )
}

export default EditProfile