
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = (props) => {
    console.log(props.loggedInUser);
    const [profileDetails, setProfileDetails] = useState([]);
    const { id } = props.match.params;
    console.log(id)
    const getProfile = () => {
        axios
        .get(`http://localhost:5000/api/profile/:${props.loggedInUser._id}`)
        .then((responseFromApi) => {
            console.log(responseFromApi);
            setProfileDetails(responseFromApi.data);
        })
        .catch((error) => console.error(error));
    };

    useEffect(getProfile, [props.loggedInUser._id]);
    useEffect(console.log(profileDetails));

    return (
        <div>
          <div>
            {profileDetails.map((user) => {
              return (
                <div key={user._id}>
                  <h3>{user.email}</h3>
                </div>
              );
            })}
          </div>
              <button className="button **is-large is-success is-rounded**">Click here</button>
        </div>
      );
    };



export default Profile;