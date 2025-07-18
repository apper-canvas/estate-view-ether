// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const propertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ],
        orderBy: [
          { fieldName: "listing_date_c", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response.success) {
        console.error("Error fetching properties:", response.message);
        return [];
      }
      
      // Transform database fields to UI format
      return response.data?.map(property => ({
        Id: property.Id,
        title: property.title_c || property.Name,
        price: property.price_c || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: property.bedrooms_c || 0,
        bathrooms: property.bathrooms_c || 0,
        squareFeet: property.square_feet_c || 0,
        yearBuilt: property.year_built_c || 0,
        description: property.description_c || '',
        features: property.features_c ? property.features_c.split(',') : [],
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'Active'
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error.response.data.message);
      } else {
        console.error("Error fetching properties:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('property_c', parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }
      
      const property = response.data;
      return {
        Id: property.Id,
        title: property.title_c || property.Name,
        price: property.price_c || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: property.bedrooms_c || 0,
        bathrooms: property.bathrooms_c || 0,
        squareFeet: property.square_feet_c || 0,
        yearBuilt: property.year_built_c || 0,
        description: property.description_c || '',
        features: property.features_c ? property.features_c.split(',') : [],
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'Active'
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching property with ID ${id}:`, error.response.data.message);
      } else {
        console.error(`Error fetching property with ID ${id}:`, error.message);
      }
      return null;
    }
  },

  async getFavorites(favoriteIds) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [
          {
            FieldName: "Id",
            Operator: "ExactMatch",
            Values: favoriteIds.map(id => parseInt(id))
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response.success) {
        console.error("Error fetching favorite properties:", response.message);
        return [];
      }
      
      // Transform database fields to UI format
      return response.data?.map(property => ({
        Id: property.Id,
        title: property.title_c || property.Name,
        price: property.price_c || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: property.bedrooms_c || 0,
        bathrooms: property.bathrooms_c || 0,
        squareFeet: property.square_feet_c || 0,
        yearBuilt: property.year_built_c || 0,
        description: property.description_c || '',
        features: property.features_c ? property.features_c.split(',') : [],
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'Active'
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching favorite properties:", error.response.data.message);
      } else {
        console.error("Error fetching favorite properties:", error.message);
      }
      return [];
    }
  },

  async search(filters) {
    try {
      const apperClient = getApperClient();
      const whereConditions = [];
      
      // Build search conditions
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        whereConditions.push({
          FieldName: "title_c",
          Operator: "Contains",
          Values: [searchTerm]
        });
      }
      
      if (filters.propertyType) {
        whereConditions.push({
          FieldName: "property_type_c",
          Operator: "EqualTo",
          Values: [filters.propertyType]
        });
      }
      
      if (filters.minPrice) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.minPrice)]
        });
      }
      
      if (filters.maxPrice) {
        whereConditions.push({
          FieldName: "price_c",
          Operator: "LessThanOrEqualTo",
          Values: [parseInt(filters.maxPrice)]
        });
      }
      
      if (filters.bedrooms) {
        whereConditions.push({
          FieldName: "bedrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.bedrooms)]
        });
      }
      
      if (filters.bathrooms) {
        whereConditions.push({
          FieldName: "bathrooms_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.bathrooms)]
        });
      }
      
      if (filters.minSquareFeet) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "GreaterThanOrEqualTo",
          Values: [parseInt(filters.minSquareFeet)]
        });
      }
      
      if (filters.maxSquareFeet) {
        whereConditions.push({
          FieldName: "square_feet_c",
          Operator: "LessThanOrEqualTo",
          Values: [parseInt(filters.maxSquareFeet)]
        });
      }
      
      if (filters.city) {
        whereConditions.push({
          FieldName: "city_c",
          Operator: "Contains",
          Values: [filters.city]
        });
      }
      
      if (filters.state) {
        whereConditions.push({
          FieldName: "state_c",
          Operator: "Contains",
          Values: [filters.state]
        });
      }
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "city_c" } },
          { field: { Name: "state_c" } },
          { field: { Name: "zip_code_c" } },
          { field: { Name: "property_type_c" } },
          { field: { Name: "bedrooms_c" } },
          { field: { Name: "bathrooms_c" } },
          { field: { Name: "square_feet_c" } },
          { field: { Name: "year_built_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "features_c" } },
          { field: { Name: "images_c" } },
          { field: { Name: "listing_date_c" } },
          { field: { Name: "status_c" } }
        ],
        where: whereConditions,
        orderBy: [
          { fieldName: "listing_date_c", sorttype: "DESC" }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };
      
      const response = await apperClient.fetchRecords('property_c', params);
      
      if (!response.success) {
        console.error("Error searching properties:", response.message);
        return [];
      }
      
      // Transform database fields to UI format
      return response.data?.map(property => ({
        Id: property.Id,
        title: property.title_c || property.Name,
        price: property.price_c || 0,
        address: property.address_c || '',
        city: property.city_c || '',
        state: property.state_c || '',
        zipCode: property.zip_code_c || '',
        propertyType: property.property_type_c || '',
        bedrooms: property.bedrooms_c || 0,
        bathrooms: property.bathrooms_c || 0,
        squareFeet: property.square_feet_c || 0,
        yearBuilt: property.year_built_c || 0,
        description: property.description_c || '',
        features: property.features_c ? property.features_c.split(',') : [],
        images: property.images_c ? property.images_c.split('\n').filter(img => img.trim()) : [],
        listingDate: property.listing_date_c || new Date().toISOString(),
        status: property.status_c || 'Active'
      })) || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching properties:", error.response.data.message);
      } else {
        console.error("Error searching properties:", error.message);
      }
      return [];
    }
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