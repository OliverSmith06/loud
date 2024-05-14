import { Dance } from '@/models/Dance';
import { Video } from '@/models/Video';
import { baseBackendUrl, baseBackendUrlV2 } from '@/secrets/env';
import axios, { AxiosRequestConfig } from 'axios';

export const getItems = async (categoryId: number) => {
    try {
        const response = await axios.get(`${baseBackendUrlV2}/getItems`, {
            params: {
              categoryId: categoryId,
            },
          });
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
};