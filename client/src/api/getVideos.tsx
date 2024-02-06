import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import axios, { AxiosRequestConfig } from 'axios';

export const getVideos = async (url: string, dance: number) => {
  try {
    const response = await axios.get(url, {
        params: {
          dance: dance,
        },
      });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};