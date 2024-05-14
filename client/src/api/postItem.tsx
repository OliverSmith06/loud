import { Dance } from '@/models/Dance';
import { Item } from '@/models/Item';
import { Video } from '@/models/Video';
import { baseBackendUrl, baseBackendUrlV2 } from '@/secrets/env';
import axios, { AxiosRequestConfig } from 'axios';

export const postItem = async (item: Item) => {
  try {
    const response = await axios.post(`${baseBackendUrlV2}/postItem`, item);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};