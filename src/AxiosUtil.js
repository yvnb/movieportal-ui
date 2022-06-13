import axios from "axios";

export const AxiosUtil = axios.create({
    baseURL: 'https://movie-portal-backend-yvnb.herokuapp.com/'
  });