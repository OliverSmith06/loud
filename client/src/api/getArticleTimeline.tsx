import axios from 'axios';

export const getArticleTimeline = async (url: string, method: string = 'GET', data?: any) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });

      const resultArray = Object.entries(response.data.dates).map(([date, occurrences]) => ({
        date,
        occurrences
      }));
      return resultArray.reverse();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };