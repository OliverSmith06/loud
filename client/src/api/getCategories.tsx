import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import { baseBackendUrl } from '@/secrets/env';
import axios, { AxiosRequestConfig } from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get(`http://${baseBackendUrl}/getCategories`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};