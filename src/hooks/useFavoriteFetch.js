import { useState, useEffect } from "react";

export const useFavoriteFetch = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites(); // TODO: Fix two calls in the beginning.
  }, []);

  async function fetchFavorites() {
    setIsLoading(true);
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteUsers_FindPPL'));
    console.log(currentFavorites);
    setIsLoading(false);
    setFavorites(currentFavorites);
  }

  return { favorites, isLoading, fetchFavorites };
};
