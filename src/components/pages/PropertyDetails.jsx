import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ImageGallery from "@/components/molecules/ImageGallery";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { propertyService } from "@/services/api/propertyService";
import { useFavorites } from "@/hooks/useFavorites";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await propertyService.getById(id);
      
      if (result) {
        setProperty(result);
      } else {
        setError("Property not found");
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error("Error loading property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!property) return;
    
    if (isFavorite(property.Id)) {
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-[4/3] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-3/4" />
                <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-1/2" />
                <div className="h-20 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-96 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error 
          title="Property not found"
          message={error}
          onRetry={loadProperty}
        />
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          to="/"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          Back to Properties
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Image Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Property Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display text-neutral-800 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-neutral-600 mb-4">
                  <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                  <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                </div>
                <div className="text-4xl font-bold gradient-text">
                  {formatPrice(property.price)}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {property.propertyType}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteToggle}
                  className={`w-12 h-12 p-0 rounded-full border-2 ${
                    isFavorite(property.Id) 
                      ? "border-red-200 bg-red-50 text-red-500" 
                      : "border-neutral-200 bg-white text-neutral-400"
                  }`}
                >
                  <ApperIcon 
                    name="Heart" 
                    className={`w-6 h-6 ${isFavorite(property.Id) ? "fill-current" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Property Stats */}
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Bed" className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">{property.bedrooms}</div>
                  <div className="text-sm text-neutral-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Bath" className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">{property.bathrooms}</div>
                  <div className="text-sm text-neutral-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Square" className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">{property.squareFeet.toLocaleString()}</div>
                  <div className="text-sm text-neutral-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Calendar" className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">{property.yearBuilt}</div>
                  <div className="text-sm text-neutral-600">Built</div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Description</h2>
              <p className="text-neutral-600 leading-relaxed">{property.description}</p>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ApperIcon name="Check" className="w-5 h-5 text-green-600" />
                    <span className="text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Property Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-2">Property Type</h3>
                  <p className="text-neutral-800">{property.propertyType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-2">Year Built</h3>
                  <p className="text-neutral-800">{property.yearBuilt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-2">Status</h3>
                  <p className="text-neutral-800">{property.status}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 mb-2">Listed Date</h3>
                  <p className="text-neutral-800">
                    {format(new Date(property.listingDate), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ContactForm property={property} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;