import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProfileService from '../../services/profile.service';

const Profile = (props) => {
  const loggedInUserId = props.loggedInUser._id;
  const [profileDetails, setProfileDetails] = useState([]);
  const getProfile = () => {
    const service = new ProfileService();
    service
      .getServiceProfile(props.match.params.id)
      .then((responseFromApi) => {
        setProfileDetails(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(getProfile, [props.match.params.id]);

  return (
    <div>
      <div className='profile-page'>
        <img src='/profile.png' alt='alternative' width={300} height={300} />
        <div className='columns is-vcentered'>
          <div className='column is-5'>
            <img
              width={250}
              height={250}
              src={profileDetails.imageUrl}
              alt='profile'
            />
          </div>
          <div className='profile-info'>
            <div className='column is-8'>
              <div className='profile'>
                <strong>Username:</strong> {profileDetails.username}
              </div>
              <div className='profile'>
                <strong>Location:</strong> {profileDetails.location}
              </div>
              <div>
                <strong>Description:</strong> {profileDetails.description}
              </div>
              <div className='profile'>
                <strong>I am: </strong>
                {profileDetails.type === 'non-volunteer'
                  ? 'Looking For Help'
                  : 'A Volunteer'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='profileupdate'>
        {props.match.params.id === loggedInUserId && (
          <Link
            className='button is-primary'
            to={`/edit-profile/${props.match.params.id}`}
          >
            Click here to update profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
