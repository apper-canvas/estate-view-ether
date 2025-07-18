import { useState, useEffect } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minSquareFeet: "",
    maxSquareFeet: "",
    city: "",
    state: ""
  });

  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const savedFilters = localStorage.getItem("estateview_filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
    
    const savedSort = localStorage.getItem("estateview_sort");
    if (savedSort) {
      setSortBy(savedSort);
    }
  }, []);

  const updateFilter = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    localStorage.setItem("estateview_filters", JSON.stringify(updatedFilters));
  };

  const updateSort = (newSortBy) => {
    setSortBy(newSortBy);
    localStorage.setItem("estateview_sort", newSortBy);
  };

  const clearFilters = () => {
    const clearedFilters = {
      searchTerm: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      minSquareFeet: "",
      maxSquareFeet: "",
      city: "",
      state: ""
    };
    setFilters(clearedFilters);
    localStorage.removeItem("estateview_filters");
  };

  return {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    clearFilters
  };
};