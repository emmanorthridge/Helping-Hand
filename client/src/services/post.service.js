import axios from 'axios';

class PostService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });
  }

  getPosts = () => {
    return this.service.get('/posts').then((response) => response);
  };

  createPost = (data) => {
    return this.service.post('/posts', data).then((response) => response);
  };

  updatePost = (data) => {
    return this.service.put(`/posts`, data).then((response) => response);
  };

  removePost = (id) => {
    return this.service.delete(`/posts/${id}`).then((response) => response);
  };
}

export default PostService;
