import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import UploadService from '../../services/upload.service';
import ProfileService from '../../services/profile.service';

const EditProfile = (props) => {
  const { _id } = props.loggedInUser;
  const [profileDetails, setProfileDetails] = useState({});
  const [detailsToUpdate, setDetailsToUpdate] = useState({});
  const getProfile = () => {
    const service = new ProfileService();
    service
      .getServiceProfile(_id)
      .then((responseFromApi) => {
        setProfileDetails(responseFromApi.data);
        setDetailsToUpdate(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  const service = new UploadService();

  const handleFormSubmit = (event) => {
    
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/profile/${_id}`, { detailsToUpdate })
      .then((response) => {
        props.getUser(response.data);
        props.history.push(`/profile/${_id}`);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setDetailsToUpdate({ ...detailsToUpdate, [name]: value });
  };

  const handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', event.target.files[0]);

    service
      .upload(uploadData)
      .then((response) => {
        console.log('response is', response);
        setDetailsToUpdate({
          ...detailsToUpdate,
          imageUrl: response.cloudinaryUrl,
        });
        console.log({ ...detailsToUpdate, imageUrl: response.cloudinaryUrl });
        props.getUser({ ...detailsToUpdate, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  };

  useEffect(getProfile, [_id]);

  return (
    <div>
      <div>
        <div>Username: {profileDetails.username}</div>
        <div>Email: {profileDetails.email}</div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='imageUrl'>Upload profile picture:</label>
        <input type='file' name='imageUrl' onChange={handleFileUpload} />
        <label>Description:</label>
        <input
          value={detailsToUpdate.description}
          type='text'
          name='description'
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          value={detailsToUpdate.location}
          type='text'
          name='location'
          onChange={handleChange}
        />

        <label>I am:</label>
        <select name='type' onChange={handleChange}>
          <option
            selected={profileDetails.type === 'volunteer'}
            value='volunteer'
          >
            Volunteer
          </option>
          <option
            selected={profileDetails.type === 'non-volunteer'}
            value='non-volunteer'
          >
            Find Help
          </option>
        </select>
      </form>
      {detailsToUpdate.imageUrl ? (
        <Link to='/'>
          <button onClick={handleFormSubmit}>Submit</button>
        </Link>
      ) : (
        <button disabled type='submit'>
          Submit
        </button>
      )}
    </div>
  );
};

export default EditProfile;
