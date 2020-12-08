import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Profile = (props) => {
    const loggedInUserId = props.loggedInUser._id
    const [profileDetails, setProfileDetails] = useState([])
    const getProfile = () => {
        axios
            .get(`http://localhost:5000/api/profile/${props.match.params.id}`)
            .then((responseFromApi) => {
                setProfileDetails(responseFromApi.data)
            })
            .catch((error) => console.error(error))
    }

    useEffect(getProfile, [])

    return (
        <div>
            <div>
                <div>Username: {profileDetails.username}</div>
                <div>Email: {profileDetails.email}</div>
                <div>Location: {profileDetails.location}</div>
                <div>Description: {profileDetails.description}</div>
                <div>I am: {profileDetails.type === 'non-volunteer' ? 'Looking For Help' : 'A Volunteer'}</div>
            </div>

            {props.match.params.id === loggedInUserId && <Link to={`/edit-profile/${props.match.params.id}`}>Click here to update profile</Link>}
        </div>
    )
}

export default Profile
