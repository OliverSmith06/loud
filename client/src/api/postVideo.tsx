import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import axios, { AxiosRequestConfig } from 'axios';

export const postVideo = async (url: string, video: Video) => {
  try {
    const response = await axios.post(url, video);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};