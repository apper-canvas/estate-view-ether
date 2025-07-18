import propertiesData from "@/services/mockData/properties.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertiesData];
  },

  async getById(id) {
    await delay(200);
    const property = propertiesData.find(p => p.Id === parseInt(id));
    return property ? { ...property } : null;
  },

  async getFavorites(favoriteIds) {
    await delay(250);
    const favorites = propertiesData.filter(p => favoriteIds.includes(p.Id));
    return favorites.map(p => ({ ...p }));
  },

  async search(filters) {
    await delay(400);
    let filteredProperties = [...propertiesData];

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredProperties = filteredProperties.filter(property =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(property =>
        property.propertyType === filters.propertyType
      );
    }

    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(property =>
        property.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(property =>
        property.bedrooms >= parseInt(filters.bedrooms)
      );
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter(property =>
        property.bathrooms >= parseInt(filters.bathrooms)
      );
    }

    if (filters.minSquareFeet) {
      filteredProperties = filteredProperties.filter(property =>
        property.squareFeet >= parseInt(filters.minSquareFeet)
      );
    }

    if (filters.maxSquareFeet) {
      filteredProperties = filteredProperties.filter(property =>
        property.squareFeet <= parseInt(filters.maxSquareFeet)
      );
    }

    if (filters.city) {
      filteredProperties = filteredProperties.filter(property =>
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.state) {
      filteredProperties = filteredProperties.filter(property =>
        property.state.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    return filteredProperties;
  },

  sortProperties(properties, sortBy) {
    const sorted = [...properties];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate));
      case "largest":
        return sorted.sort((a, b) => b.squareFeet - a.squareFeet);
      case "smallest":
        return sorted.sort((a, b) => a.squareFeet - b.squareFeet);
      default:
        return sorted;
    }
  }
};