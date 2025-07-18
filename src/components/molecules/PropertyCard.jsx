import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/utils/cn";

const PropertyCard = ({ property, className }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isPropertyFavorite = isFavorite(property.Id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPropertyFavorite) {
      removeFromFavorites(property.Id);
      toast.success("Property removed from favorites");
    } else {
      addToFavorites(property.Id);
      toast.success("Property added to favorites");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
        <Link to={`/property/${property.Id}`}>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteToggle}
                className={cn(
                  "w-10 h-10 p-0 rounded-full bg-white/90 hover:bg-white border-0 hover:scale-110",
                  isPropertyFavorite ? "text-red-500" : "text-neutral-400"
                )}
              >
                <ApperIcon 
                  name={isPropertyFavorite ? "Heart" : "Heart"} 
                  className={cn("w-5 h-5", isPropertyFavorite && "fill-current")}
                />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                {property.propertyType}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-neutral-800 font-display line-clamp-1">
                {property.title}
              </h3>
              <div className="text-2xl font-bold gradient-text">
                {formatPrice(property.price)}
              </div>
            </div>
            
            <div className="flex items-center text-neutral-600 mb-4">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-neutral-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <ApperIcon name="Bed" className="w-4 h-4 mr-1 text-primary-600" />
                  <span>{property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Bath" className="w-4 h-4 mr-1 text-primary-600" />
                  <span>{property.bathrooms} bath{property.bathrooms !== 1 ? "s" : ""}</span>
                </div>
                <div className="flex items-center">
                  <ApperIcon name="Square" className="w-4 h-4 mr-1 text-primary-600" />
                  <span>{property.squareFeet.toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;