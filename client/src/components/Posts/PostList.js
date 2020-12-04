
import React, { useState, useEffect } from "react";
import axios from "axios";

import 'bulma/css/bulma.css';


const PostList = () => {
    const [listOfPosts, setListOfPosts] = useState([]);

    const getAllPosts = () => {
        axios
        .get(`http://localhost:5000/api/posts`)
        .then((responseFromApi) => {
            console.log(responseFromApi);
            setListOfPosts(responseFromApi.data);
        })
        .catch((error) => console.error(error));
    };

    useEffect(getAllPosts, []);

    return (
        <div>
          <div>
            <h2>Posts from the Backend</h2>
            {listOfPosts.map((post) => {
              return (
                <div key={post._id}>
                  <h3>{post.text}</h3>
                </div>
              );
            })}
          </div>
              <button class="button **is-large is-success is-rounded**">Click here</button>
        </div>
      );
    };


export default PostList;