import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import axios, { AxiosRequestConfig } from 'axios';

export const getVideo = async (url: string, danceId: number, orderId: number) => {
  try {
    const response = await axios.get(url, {
        params: {
          danceId: danceId,
          orderId: orderId
        },
      });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};