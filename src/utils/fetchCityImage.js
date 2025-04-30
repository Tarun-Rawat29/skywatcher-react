const fetchCityImage = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${cityName}&client_id=2dfByLS3lvdLOyhcBLjdw5wxSO1a3aAGR-3nArRw5Ns`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular;
      }
      return null;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };
  
  export default fetchCityImage;  