import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("estateview_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (propertyId) => {
    const updatedFavorites = [...favorites, {
      propertyId,
      savedAt: new Date().toISOString()
    }];
    setFavorites(updatedFavorites);
    localStorage.setItem("estateview_favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter(fav => fav.propertyId !== propertyId);
    setFavorites(updatedFavorites);
    localStorage.setItem("estateview_favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.propertyId === propertyId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};