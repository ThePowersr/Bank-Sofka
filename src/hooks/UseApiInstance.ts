import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const authorId = process.env.EXPO_PUBLIC_AUTHOR_ID;

const UseApiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    authorId: authorId
  },
  maxRedirects: 1
});

export default UseApiInstance;
