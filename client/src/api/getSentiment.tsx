import axios from 'axios';

enum ScoreType {
  "P+" = 2,
  "P" = 1,
  "NEU" = 0,
  "N" = -1,
  "N+" = -2,
  "NONE" = 0
}

export const getSentiment = async (url: string, method: string = 'GET', data?: any) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });

      
      const sentenceList = response.data.sentence_list;
      
      for (const sentence of sentenceList) {
        sentence.score_tag = ScoreType[sentence.score_tag];
      }

      console.log(response.data)
  
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };