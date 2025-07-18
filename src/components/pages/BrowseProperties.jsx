import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import PropertyFilters from "@/components/organisms/PropertyFilters";
import ViewToggle from "@/components/molecules/ViewToggle";
import SortDropdown from "@/components/molecules/SortDropdown";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { propertyService } from "@/services/api/propertyService";
import { useFilters } from "@/hooks/useFilters";

const BrowseProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const { filters, sortBy, updateFilter, updateSort, clearFilters } = useFilters();

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");
      
      let result;
      const hasFilters = Object.values(filters).some(value => value !== "" && value !== null);
      
      if (hasFilters) {
        result = await propertyService.search(filters);
      } else {
        result = await propertyService.getAll();
      }
      
      const sortedProperties = propertyService.sortProperties(result, sortBy);
      setProperties(sortedProperties);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [filters, sortBy]);

  useEffect(() => {
    const searchTerm = searchParams.get("search");
    if (searchTerm && searchTerm !== filters.searchTerm) {
      updateFilter("searchTerm", searchTerm);
    }
  }, [searchParams]);

  const handleSearch = (searchTerm) => {
    updateFilter("searchTerm", searchTerm);
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
    toast.success("Filters cleared");
  };

  const handleRetry = () => {
    loadProperties();
  };

  const handleBrowseAll = () => {
    handleClearFilters();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Failed to load properties"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="lg:sticky lg:top-24">
            <div className="lg:hidden mb-4">
              <Button
                variant="ghost"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ApperIcon name="Filter" className="w-4 h-4" />
                  Filters
                </span>
                <ApperIcon name={isFiltersOpen ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
              </Button>
            </div>
            
            <div className={`${isFiltersOpen ? "block" : "hidden"} lg:block`}>
              <PropertyFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold font-display gradient-text">
                Browse Properties
              </h1>
              <p className="text-neutral-600 mt-2">
                {properties.length} {properties.length === 1 ? "property" : "properties"} found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <SortDropdown sortBy={sortBy} onSortChange={updateSort} />
              <ViewToggle view={view} onViewChange={setView} />
            </div>
          </div>

          {/* Properties Grid/List */}
          {properties.length === 0 ? (
            <Empty 
              title="No properties found"
              message="Try adjusting your search criteria or browse all properties."
              actionLabel="Browse All Properties"
              onAction={handleBrowseAll}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyGrid properties={properties} view={view} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;