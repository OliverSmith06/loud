import axios from "axios";

export const deleteVideo = async (url: string, videoId: number) => {
  try {
    const response = await axios.delete(url, { params: { id: videoId } });
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
