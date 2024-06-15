import BaseUrl from "../Base Url Service/BaseUrl";
import axios from 'axios';

class PostServices {
  constructor() {
    this.api = axios.create({
      baseURL: BaseUrl.BASE_URL,
    });
  }

  async login(credentials) {
    try {
      const response = await this.api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async registration(credentials) {
    try {
      const response = await this.api.post('/auth/signup', credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new PostServices();
