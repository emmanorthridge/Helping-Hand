import axios from 'axios';

class ProfileService {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://helping-app.herokuapp.com/api',
      withCredentials: true,
    });
  }

  getServiceProfile = (userId) => {
    return this.service.get('/profile/' + userId).then((response) => response);
  };

  updateProfile = (userId, details) => {
    return this.service
      .put(`/profile/` + userId, details)
      .then((response) => response);
  };
}

export default ProfileService;
