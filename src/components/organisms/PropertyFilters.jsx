import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FilterField from "@/components/molecules/FilterField";
import { cn } from "@/utils/cn";

const PropertyFilters = ({ filters, onFilterChange, onClearFilters, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const propertyTypes = [
    { value: "House", label: "House" },
    { value: "Condo", label: "Condo" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Loft", label: "Loft" }
  ];

  const bedroomOptions = [
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" }
  ];

  const bathroomOptions = [
    { value: "1", label: "1+" },
    { value: "1.5", label: "1.5+" },
    { value: "2", label: "2+" },
    { value: "2.5", label: "2.5+" },
    { value: "3", label: "3+" }
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== "" && value !== null);

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-neutral-200", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
            <ApperIcon name="Filter" className="w-5 h-5" />
            Filters
          </h2>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-sm text-neutral-600 hover:text-neutral-800"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden w-8 h-8 p-0"
            >
              <ApperIcon name={isExpanded ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : "auto" }}
          className={cn("space-y-6", !isExpanded && "hidden md:block")}
        >
          {/* Property Type */}
          <FilterField
            label="Property Type"
            type="select"
            value={filters.propertyType}
            onChange={(value) => onFilterChange("propertyType", value)}
            options={propertyTypes}
            placeholder="All Types"
          />

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <FilterField
              label="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(value) => onFilterChange("minPrice", value)}
              placeholder="$0"
            />
            <FilterField
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(value) => onFilterChange("maxPrice", value)}
              placeholder="No limit"
            />
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <FilterField
              label="Bedrooms"
              type="select"
              value={filters.bedrooms}
              onChange={(value) => onFilterChange("bedrooms", value)}
              options={bedroomOptions}
              placeholder="Any"
            />
            <FilterField
              label="Bathrooms"
              type="select"
              value={filters.bathrooms}
              onChange={(value) => onFilterChange("bathrooms", value)}
              options={bathroomOptions}
              placeholder="Any"
            />
          </div>

          {/* Square Footage */}
          <div className="grid grid-cols-2 gap-4">
            <FilterField
              label="Min Sq Ft"
              type="number"
              value={filters.minSquareFeet}
              onChange={(value) => onFilterChange("minSquareFeet", value)}
              placeholder="Any"
            />
            <FilterField
              label="Max Sq Ft"
              type="number"
              value={filters.maxSquareFeet}
              onChange={(value) => onFilterChange("maxSquareFeet", value)}
              placeholder="Any"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <FilterField
              label="City"
              type="text"
              value={filters.city}
              onChange={(value) => onFilterChange("city", value)}
              placeholder="Any city"
            />
            <FilterField
              label="State"
              type="text"
              value={filters.state}
              onChange={(value) => onFilterChange("state", value)}
              placeholder="Any state"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyFilters;