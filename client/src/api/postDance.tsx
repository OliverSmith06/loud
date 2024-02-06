import { Dance } from '@/models/Dance';
import axios, { AxiosRequestConfig } from 'axios';

export const postDance = async (url: string, dance: Dance) => {
  try {
    const response = await axios.post(url, dance);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};