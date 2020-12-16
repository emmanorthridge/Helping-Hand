import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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
    const service = new ProfileService();


    service
    .updateProfile(_id, { detailsToUpdate })
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
      <div className='field'>
        <div>Username: {profileDetails.username}</div>
        <div>Email: {profileDetails.email}</div>
      </div>
      <div className='form'>
        <form onSubmit={handleFormSubmit}>
          <label className='label' htmlFor='imageUrl'>
            Upload profile picture:
          </label>
          <input type='file' name='imageUrl' onChange={handleFileUpload} />
          <label className='label'>Description:</label>
          <input
            className='input is-primary'
            value={detailsToUpdate.description}
            type='text'
            name='description'
            onChange={handleChange}
          />
          <label className='label'>Location:</label>
          <input
            className='input is-primary'
            value={detailsToUpdate.location}
            type='text'
            name='location'
            onChange={handleChange}
          />

          <label className='label'>I am:</label>
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

          <div>
            {detailsToUpdate.imageUrl ? (
              <Link to='/'>
                <button className='submit-edit' onClick={handleFormSubmit}>
                  Submit
                </button>
              </Link>
            ) : (
              <button disabled type='submit'>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
