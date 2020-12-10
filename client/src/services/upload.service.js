import axios from 'axios';

class UploadService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });
  }

  upload = (theFile) => {
    return this.service
      .post('/upload', theFile)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export default UploadService;
