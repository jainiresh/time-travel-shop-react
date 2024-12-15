import axios from "axios";

export async function youtubeSearchApi(searchKey) {
  try {
    const response = await axios.get(`http://localhost:3001/youtube-search?q=${searchKey}`);  // Call your backend
    console.log(response);
    return response.data;  // Handle YouTube API data
  } catch (error) {
    console.error('Error during API request:', error);
    return null;  // Handle error gracefully
  }
}
