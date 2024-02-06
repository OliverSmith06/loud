import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import axios, { AxiosRequestConfig } from 'axios';

export const updateVideoOrder = async (url: string, initialOrdering: number[], orderItems: number[], danceId: number) => {
  try {
    const response = await axios.put(url, { orderItems, danceId, initialOrdering });
    window.location.reload()
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};