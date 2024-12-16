import axios from "axios";

export async function youtubeSearchApi(searchKey) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/youtube-search?q=${searchKey}`);  // Call your backend
    return response.data;  // Handle YouTube API data
  } catch (error) {
    console.error('Error during API request:', error);
    return null;  // Handle error gracefully
  }
}
