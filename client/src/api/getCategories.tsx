import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import { baseBackendUrlV2 } from '@/secrets/env';
import axios, { AxiosRequestConfig } from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseBackendUrlV2}/getCategories`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};