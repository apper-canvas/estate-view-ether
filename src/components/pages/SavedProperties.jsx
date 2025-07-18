import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ViewToggle from "@/components/molecules/ViewToggle";
import SortDropdown from "@/components/molecules/SortDropdown";
import { propertyService } from "@/services/api/propertyService";
import { useFavorites } from "@/hooks/useFavorites";

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const { favorites } = useFavorites();

  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (favorites.length === 0) {
        setProperties([]);
        return;
      }

      const favoriteIds = favorites.map(fav => fav.propertyId);
      const result = await propertyService.getFavorites(favoriteIds);
      const sortedProperties = propertyService.sortProperties(result, sortBy);
      setProperties(sortedProperties);
    } catch (err) {
      setError("Failed to load saved properties");
      console.error("Error loading saved properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProperties();
  }, [favorites, sortBy]);

  const handleRetry = () => {
    loadSavedProperties();
  };

  const handleBrowseProperties = () => {
    // Navigate to browse properties page
    window.location.href = "/";
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved properties?")) {
      localStorage.removeItem("estateview_favorites");
      setProperties([]);
      toast.success("All saved properties removed");
      // Force a page reload to reset the favorites hook
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-10 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-3/4" />
                  <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-full" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-16" />
                    <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Failed to load saved properties"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display gradient-text flex items-center gap-3">
              <ApperIcon name="Heart" className="w-8 h-8 text-red-500" />
              Saved Properties
            </h1>
            <p className="text-neutral-600 mt-2">
              {properties.length} {properties.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
          
          {properties.length > 0 && (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Clear All
              </Button>
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
              <ViewToggle view={view} onViewChange={setView} />
            </div>
          )}
        </div>

        {/* Content */}
        {properties.length === 0 ? (
          <Empty 
            title="No saved properties yet"
            message="Start browsing properties and save your favorites to see them here."
            actionLabel="Browse Properties"
            onAction={handleBrowseProperties}
          />
        ) : (
          <PropertyGrid properties={properties} view={view} />
        )}
      </motion.div>
    </div>
  );
};

export default SavedProperties;