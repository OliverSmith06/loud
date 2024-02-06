import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import axios, { AxiosRequestConfig } from 'axios';

export const deleteVideo = async (url: string, videoId: number) => {
  try {
    const response = await axios.delete(url, { params: { id: videoId}});
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};